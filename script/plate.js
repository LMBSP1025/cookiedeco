function getCookie(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value ? value[2] : null;
}
var cookie = document.getElementById("cookie").src = "img/" + getCookie("cookieid") + ".png";
var icing = document.getElementById("icing").src = window.sessionStorage.getItem('cookiedata');

if (!Kakao.isInitialized()) {
    Kakao.init('3224a262ae689ba1b770ff9375fc24c0');
}

document.getElementById("kakaotalk").addEventListener("click", function sendKakao() {
    // 메시지 공유 함수
    Kakao.Link.sendScrap({
        requestUrl: 'http://cookiedeco.netlify.app', // 페이지 url
        templateId: 81883, // 메시지템플릿 번호
        templateArgs: {
            PROFILE: 'icon.png', // 프로필 이미지 주소 ${PROFILE}
            THUMB: 'share.jpg', // 썸네일 주소 ${THUMB}
            TITLE: '쿠키가 완성되었습니다!', // 제목 텍스트 ${TITLE}
            DESC: '다양한 쿠키를 선택하고 꾸며 나만의 쿠키를 만들어보세요.', // 설명 텍스트 ${DESC}
        },
    })
});
document.getElementById("url").addEventListener("click", function copy() {
    // ex) 특정 변수값 복사하기
    const someData = "http://cookiedeco.netlify.app";

    let tempInput = document.createElement("input")
    tempInput.value = someData;

    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
});