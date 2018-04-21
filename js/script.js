/* BEM VINDO, MARINHEIRO 
   O desafio demorou mas saiu rápido
   Antes de tudo, leia todas as dicas e obersações no link do desafio
   ...
   *-* Todo conteudo dentro de $(document).ready( function() { ... } ); será execultado assim que carregar a página
*/
$(document).ready(function() {
    //Inserir um comando para deixar a div #alerta movel  (Dica: função da jqueryui)
    $("#alerta").draggable();

    // BOTÕES 
    $('.btn1').mouseenter(function(){
        $(this).stop().animate({
            'width':'205px',
            'height':'45px' // aumenta o tamanho do botao para um tamanho maior x
        },'medium');
    })


    $('.btn1').mouseleave(function(){
        $(this).stop().animate({
            'width':'200px',
            'height':'40px' // diminui para o valor y original
        },'medium');
    })

    $('.btn2').mouseenter(function(){
        $(this).stop().animate({
            'width':'205px',
            'height':'45px' // aumenta o tamanho do botao para um tamanho maior x
        },'medium');
    })


    $('.btn2').mouseleave(function(){
        $(this).stop().animate({
            'width':'200px',
            'height':'40px' // diminui para o valor y original
        },'medium');
    })

    // TEXTO INFORMATIVO

    $(function () {
    $(".container").tipsy();
    });

    // SMOTH SCROLLING
    $(document).ready(function(){
        
        $("a").on('click', function(event) {

            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;

                $('html, body').animate({
                    scrollTop: $(hash).offset().top
                }, 800, function(){
   
                window.location.hash = hash;
                });
            } 
        });
    });

    //chamar a funcão chamada "contador"
    //Fazer a alerta aparecer depois de 5 segundos, chamando a função toggleAlert
    contador(5);

    //Clique no X - Fechar Alerta
    $('.fa').click(function(){
        $("#alerta").hide();
    })


    $("#novidadesform [type='submit']").click(function(e) {
        e.preventDefault();

        //criar uma variavel e pegar o conteudo digitado na input
        var email = document.getElementById("email").value;
        //verificar se o campo não está vazio com if e else
        //se for vazio execultar o comando abaixo
        //toastr.error('Preencha um email!', 'Error!');

        if(email == ""){
            //alert('Por favor, preencha seu e-mail');
            toastr.error('Preencha um email!', 'Error!');
            document.getElementById("email").focus();
            return false;
        }

        //se não for vazio enviar uma requisição com -requisição AJAX- do tipo POST para http://51.254.204.44/ti/enviar_email.php 
        // -- passando o paramentro "meuemail" e o dataType JSON
        else{
            reqAjax(email);
        }

        //SE OCORRER TUDO CERTO COM A REQUISIÇAO: 1° exibir um toastr.sucess com a mensagem  | 2° 
        // 2° colocar um texto na div  de class resultado. "*emaildigitado* foi salvo em nossa lista de novidades =)"
        //limpar input
        //fechar a alerta depois de 2 segundos

        //SE não ocorrer tudo certo a alerta ñ deve fechar. Exibir um toastr.error com a mensagem do erro retornada pelo servidor

    });
});

/* NÃO MEXER 
   Se tiver visível, após executar a função, a div será oculta e vice-versa
*/
function toggleAlert() {
    $('#alerta').slideToggle();
}

//Contador inicia em 5

function contador(count) {
    //Ocultar a div #contador qnd o cronometro ser menor ou igual a ZERO
    //Mudar a cor do texto da div #contador qnd o cronometro ser menor ou igual a TRES
    //Sinalizar contador. Ex: Alerta aparecendo em: __  (usar a div #contador)
    var counter = setInterval(timer,1000);

    function timer(){
        count=count-1;

        if(count <= 3){
            document.getElementById("contador").style.color = '#FF0000';
        }
        
        if (count <= 0){
            //Zerando intervalo
            clearInterval(counter);

            //Ocultando div contador
            var display = document.getElementById("contador").style.display;
            // if(display == "none")
            //     document.getElementById("contador").style.display = 'block';
            // else
                document.getElementById("contador").style.display = 'none';

            //Mostrando o alerta
            toggleAlert();

            return;
        }

        document.getElementById("timer").innerHTML=count; // watch for spelling
    }
    
}

function reqAjax(email){

    $.ajax({
        url : 'http://51.254.204.44/ti/enviar_email.php',
        type : 'post',
        data : {'meuemail': email},
        dataType: 'JSON',
        // beforeSend: function(){

        // },
        success: function(retorno){
            //$('#resultado').html(retorno);
            console.log(retorno);
            toastr.success('E-mail enviado');
            $('#resultado').html(email + " foi salvo em nossa lista de novidades =)");
            document.getElementById("email").value="";
            contador(2);
        },
        error: function(erro){
            console.log(erro);
            toastr.success(erro);
            //$('#resultado').html(erro);
        }       
    })
}
