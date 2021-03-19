# AndroidMemoryGameWebView
 
 Versão do jogo desenvolvida utilizando as tecnologias web através de um WebView do Android.
 
 O layout e a lógica do jogo agora está escrita em JavaScript, CSS e HTML.
 
 Algumas funcionalidades foram implementadas em Java, nativamente no Android, como exibir um Toast ou uma Janela modal para responder "sim" ou "não".
 Estas funcionalidades foram implementadas como uma interface para binding Javascript -> Java, dessa forma, o código Java é chamado no JavaScript.
 
 O contrário também acontece, no modal onde o usuário responde "sim" ou "não", o Android(Java), executa uma função do JavaScript.
 
 Nesta versão, a persistência do placar, que antes utilizava o SQLite, passa a utilizar o LocalStorage, controlada pelo JavaScript, presente no WebView do Android assim como em outros navegadores.
 
[Vídeo de demonstração](https://drive.google.com/file/d/19d-w_EkP4-R51_KZ4XITZm0iBrCNrAGE/view?usp=sharing)

Link para a versão Android(Java):
 [AndroidMemoryGame](https://github.com/leuribeiru/AndroidMemoryGame)
