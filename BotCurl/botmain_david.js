var request = require('request');

const ELAPSED_TOKEN_TIME = 1000 * 60 * 20; // every 20 minutes (in ms 1000*60*20) 

function first_boot(){
    var startDate = new Date();

    const SEC_DELAY = 60 * 1 * 1000;
    const USER_NAME = "rachele_miotto00";
    const PASS_ENCRYPTED = "%23PWD_INSTAGRAM_BROWSER%3A10%3A1589316717%3AAahQAIRop%2BViTaJYbRRHpteFV4qJETdkDRLSVYq35NI1k2ImaZdTPeSVXZ%2Bw21xuzfMB8g1XgayjfEQrt71VdjHzXhQKxUoI06wwJEEYQhSD2s43WPeUhQPO%2BcGXbilCvRW0AiN2bI8u7EVMWMkuCzo%3D&queryParams=%7B%7D&optIntoOneTap=false"
    const POST_ID = "2307410364945516138"; // FEDEROSSI

    var headers = {
        'authority': 'www.instagram.com',
        'x-ig-www-claim': 'hmac.AR1qoTFzoWymVJcalZt1F1YNOYu67iKVp3NRMm9q_vbBKGZR',
        'x-instagram-ajax': '9b09d2a60ea6',
        'content-type': 'application/x-www-form-urlencoded',
        'accept': '*/*',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/81.0.4044.122 Chrome/81.0.4044.122 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        'x-csrftoken': 'W914EH38Ir9sHzRAPEwrNScC5u63UPLw',
        'x-ig-app-id': '936619743392459',
        'origin': 'https://www.instagram.com',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://www.instagram.com/',
        'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7,ca;q=0.6',
        'cookie': 'ig_cb=1; ig_did=FD1CB2FC-A47B-40AB-A022-E22EC4241824; mid=XrrzYQAEAAHpTRO-mkMjasUdSkLh; shbid=15129; shbts=1589310344.641645; rur=FTW; csrftoken=W914EH38Ir9sHzRAPEwrNScC5u63UPLw; urlgen="{\"5.170.200.75\": 16232}:1jYb1C:rRIpmgSAwOylJTwOtvD6enTqVN8"'
    };

    var dataString = 'username=' + USER_NAME + '&enc_password=' + PASS_ENCRYPTED;

    var options = {
        url: 'https://www.instagram.com/accounts/login/ajax/',
        method: 'POST',
        headers: headers,
        body: dataString
    };


    function login(error, response, body) {

        let csrftoken ="",sessionid="",urlgen="",ds_user_id="";
        let cookies;
        if (!error && response.statusCode == 200) {
            cookies = response.headers["set-cookie"];

            cookies.forEach(cookie => {
                if(cookie.startsWith("csrftoken")){
                    csrftoken = cookie.substring(cookie.indexOf("=")+1, cookie.indexOf(";"));
                }
                if(cookie.startsWith("urlgen")){
                    urlgen = cookie.substring(cookie.indexOf("=")+1, cookie.indexOf(";"));
                }            
                if(cookie.startsWith("sessionid")){
                    sessionid = cookie.substring(cookie.indexOf("=")+1, cookie.indexOf(";"));
                }
                if(cookie.startsWith("ds_user_id")){
                    ds_user_id = cookie.substring(cookie.indexOf("=")+1, cookie.indexOf(";"));
                }
            });

            //console.log(response.headers);
            console.log("csfrffr : " + csrftoken );
            console.log("sessionid : " + sessionid );
            console.log("urlgen : " + urlgen );
            console.log("finito?");

            comment(csrftoken,sessionid,urlgen,ds_user_id);
        }
    }

    request(options, login);

    function comment(csrftoken,sessionid,urlgen,ds_user_id){
        console.log("ok ora commento");

        var headersCommento = {
            'authority': 'www.instagram.com',
            'x-ig-www-claim': 'hmac.AR1qoTFzoWymVJcalZt1F1YNOYu67iKVp3NRMm9q_vbBKGZR',
            'x-instagram-ajax': '9b09d2a60ea6',
            'content-type': 'application/x-www-form-urlencoded',
            'accept': '*/*',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/81.0.4044.122 Chrome/81.0.4044.122 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'x-csrftoken': csrftoken,
            'x-ig-app-id': '936619743392459',
            'origin': 'https://www.instagram.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://www.instagram.com/p/CAFkYBxocZq/',
            'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7,ca;q=0.6',
            'cookie': 'ig_cb=1; ig_did=FD1CB2FC-A47B-40AB-A022-E22EC4241824; mid=XrrzYQAEAAHpTRO-mkMjasUdSkLh; shbid=15129; shbts=1589310344.641645; rur=FTW; csrftoken='+csrftoken+'; ds_user_id=' + ds_user_id + ' ; sessionid=' + sessionid + '; urlgen=' + urlgen + ""
        };
        
        var dataStringCommento = 'comment_text=1&replied_to_comment_id=';
        
        var optionsCommento = {
            url: 'https://www.instagram.com/web/comments/'+POST_ID+'/add/',
            method: 'POST',
            headers: headersCommento,
            body: dataStringCommento
        };

        let cnt = 0;
        
        function commento(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                let parsedBody = JSON.parse(body);

                if(parsedBody.status==="ok"){
                    console.log("[msg] " + cnt + " inviato");
                }else{
                    console.error("[msg] " + cnt + " NON inviato");
                }
                
                cnt++;
            }else{
                console.log("errore");
                console.error(error);
                console.error(response);
                console.error(body);
            }
        }

        function loopcomments(){
            request(optionsCommento, commento);

            var endDate = new Date() - startDate;
            if(endDate>ELAPSED_TOKEN_TIME){
                first_boot();
            } else {
                setTimeout(loopcomments,SEC_DELAY + Math.random() * 10);
            }
        }

        loopcomments();
    }
}

first_boot();
