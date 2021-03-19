package com.example.jogomemoriawebview;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ImageView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    public WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = (WebView) findViewById(R.id.webView);
        webView.setVisibility(View.INVISIBLE);
        webView.setWebChromeClient(new WebChromeClient());

        //Habilita o JS
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);

        //Garante que usará o WebView e não o navegador padrão
        webView.setWebViewClient(new WebViewClient(){

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);

                ImageView imageView = (ImageView) findViewById(R.id.imageView);
                imageView.setVisibility(View.INVISIBLE);
                webView.setVisibility(View.VISIBLE);
            }
        });

        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
        webView.loadUrl("file:///android_asset/index.html");
    }

    // Possibilita o uso do botão voltar
    @Override
    public void onBackPressed() {
        if(webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }


    // Executa um comando JavaScript
    public void runJavaScript(final String jsCode){
        this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                int SDK_INT = android.os.Build.VERSION.SDK_INT;
                if (SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
                    webView.evaluateJavascript(jsCode, null);
                } else {
                    webView.loadUrl("javascript:" + jsCode);
                }
            }
        });
    }


    // Interface para binding Javascript -> Java
    public class WebAppInterface {
        MainActivity mainActivity;
        public WebAppInterface(MainActivity activity) {
            this.mainActivity = activity;
        }
        @JavascriptInterface
        public void androidToast(String msg) {
            Toast.makeText(mainActivity, msg, Toast.LENGTH_SHORT).show();
            // Chama uma função do JavaScript
            runJavaScript("start();");
        }

        @JavascriptInterface
        public void onClearScoreClick(){
            AlertDialog.Builder alertBuilder = new AlertDialog.Builder(this.mainActivity);
            alertBuilder.setTitle("Excluir Placares?");
            alertBuilder.setMessage("Deseja realmente excluír os placares?");

            class OnClickPositive implements DialogInterface.OnClickListener{
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    runJavaScript("doClearScore();");
                }
            }
            alertBuilder.setPositiveButton("Sim", new OnClickPositive());

            class OnClickNegative implements DialogInterface.OnClickListener{

                @Override
                public void onClick(DialogInterface dialog, int which) {
                    runJavaScript("cancelClearScore();");
                }
            }
            alertBuilder.setNegativeButton("Não", new OnClickNegative());

            AlertDialog alertDialog = alertBuilder.create();
            alertDialog.show();

        }
    }

}