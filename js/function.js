$(document).ready(function(){
    // 회원가입처리
    $("#join").submit(function(){
        var userNM = $("input[name='userNM']");
        if( userNM.val() =='') {
            alert("성명을 입력하세요");
            userNM.focus();
            return false;
        }

        var email = $("input[name='email']");
        let existUser = JSON.parse(localStorage.getItem(email.val()));
        if(email.val() == ''){
            alert('이메일을 입력하세요');
            email.focus();
            return false;
        } else {
            var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!emailRegex.test(email.val())) {
                alert('이메일 주소가 유효하지 않습니다. ex)abc@gmail.com');
                email.focus();
                return false;
            }

            if(existUser != null){
                alert('이미 가입된 회원입니다.');
                email.focus();
                return false;
            }
        }

        var phone = $("input[name='phone']");
        if(phone.val() ==''){
            alert('휴대폰 번호를 입력하세요');
            phone.focus();
            return false;
        }
        if(!/^[0-9]{10,11}$/.test(phone.val())){
            alert("휴대폰 번호는 숫자만 10~11자리 입력하세요.");
            return false;
        }

        var password = $("input[name='Password']");
        var repassword = $("input[name='rePassword']");
        if(password.val() =='') {
            alert("비밀번호를 입력하세요!");
            password.focus();
            return false;
        }
        if(password.val().search(/\s/) != -1){
            alert("비밀번호는 공백없이 입력해주세요.");
            return false;
        }
        if(!/^[a-zA-Z0-9!@#$%^&*()?_~]{5,10}$/.test(password.val())){
            alert("비밀번호는 숫자, 영문, 특수문자(!@$%^&*?_~ 만 허용) 조합으로 5~10자리를 사용해야 합니다.");
            return false;
        }
        // 영문, 숫자, 특수문자 2종 이상 혼용
        var chk=0;
        if(password.val().search(/[0-9]/g) != -1 ) chk ++;
        if(password.val().search(/[a-z]/ig)  != -1 ) chk ++;
        if(password.val().search(/[!@#$%^&*()?_~]/g) != -1) chk ++;
        if(chk < 2){
            alert("비밀번호는 숫자, 영문, 특수문자를 두가지이상 혼용하여야 합니다.");
            return false;
        }
        
        if(repassword.val() =='') {
            alert("비밀번호를 다시 한번 더 입력하세요!");
            repassword.focus();
            return false;
        }
        if(password.val()!== repassword.val()){
            alert('입력한 두 개의 비밀번호가 일치하지 않습니다');
            return false;
        }

        $(function(){
            let user = {
                name : userNM.val(),
                id : email.val(),
                mobile : phone.val(),
                pwd : password.val()
            }
        
            //객체, 배열을 json문자열로 변환하여 저장
            let jsonStr = JSON.stringify(user);
            // alert(jsonStr);
            localStorage.setItem(email.val(), jsonStr);
        
            let returnJsonStr = localStorage.getItem(email.val());
            console.log(returnJsonStr, typeof returnJsonStr);
            let jsObj = JSON.parse(returnJsonStr);
            console.log(jsObj);
            alert('가입성공');
        });

    });
});

/*********************************************************************************/
/* 로그인                                                              */
/*********************************************************************************/
$(document).ready(function(){
    $("#check").submit(function(){
        let k = $("input[name='username']");
        let p = $("input[name='password']");

        let v = JSON.parse(localStorage.getItem(k.val()));
        console.log(v);
        
        if(v != null){
            if(p.val() == v.pwd){
                alert("로그인 성공!");
            }
            else{
                alert("비밀번호가 틀렸습니다. \n비밀번호를 확인해주세요.");
                p.focus();
                return false;
            }
        }
        else{
            alert("아이디가 존재하지 않습니다. \n이메일주소를 확인해주세요.");
            k.focus();
            return false;
        }
    });
});