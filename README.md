# AndroidMemoryGameWebView
 
 Versão do jogo desenvolvida utilizando as tecnologias web através de um WebView do Android.
 
 O layout e a lógica do jogo agora está escrita em JavaScript, CSS e HTML.
 
 Algumas funcionalidades foram implementadas em Java, nativamente no Android, como exibir um Toast ou uma Janela modal para responder "sim" ou "não".
 Estas funcionalidades foram implementadas como uma interface para binding Javascript -> Java, dessa forma, o código Java é chamado no JavaScript.
 
 O contrário também acontece, no modal onde o usuário responde "sim" ou "não", o Android(Java), executa uma função do JavaScript.
 
 Nesta versão, a persistência do placar, que antes utilizava o SQLite, passa a utilizar o LocalStorage, controlada pelo JavaScript, presente no WebView do Android assim como em outros navegadores.
 
[Vídeo de demonstração](https://drive.google.com/file/d/19d-w_EkP4-R51_KZ4XITZm0iBrCNrAGE/view?usp=sharing)

# Funcionamento do Jogo

 Ao ser iniciada, a aplicação gera uma sequência numérica aleatória, por exemplo: 1 - 5 - 3 - 4 - 2 - 6

 O jogador deve acertar a sequência que foi gerada

 Se o jogador clicar no botão correto, correspondente a sequência gerada, o botão desaparece, a cor de fundo será a mesma cor do botão e a barra de progresso aumenta

 Se o jogador clicar no botão errado todos os botões reaparecem, a cor de fundo volta a ser branca e a barra de progresso é reiniciada.

 Se o todos os botóes forem pressionados na ordem correta, o jogo termina e é exibida uma mensagem parabenizando o jogador
 
 Se o jogador terminar ele pode salvar o seu placar, colocando um nome. A pontuação será gravada com o tempo gasto e a quantidade de erros cometidos.

 Se o botão "Reiniciar" for pressionado, uma nova sequência numérica aleatória será gerada, todos os botões reaparecerão, a cor de fundo será branca e a barra de progresso sera reiniciada.

 O placar pode ser consultado clicando no botão "VER PLACAR", nesta tela o usuário pode escolher se quer ver o placar por tempo gasto ou o placar de erros cometidos.

 Na tela do "Placar" tem um botão "Apagar Placares", se o usuário clicar um alerta irá aparecer, caso confirme os placares serão apagados.


# Mais informações
 A versão para Android(Java) pode ser acessada neste [link](https://github.com/leuribeiru/AndroidMemoryGame)

