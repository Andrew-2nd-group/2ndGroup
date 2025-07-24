// DOM(문서 객체 모델)이 완전히 로드된 후에 스크립트를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {
    
    const cmdInput = document.getElementById("CMDINPUT");

    // 페이지가 로드되면 바로 입력창에 포커스를 맞춥니다.
    if(cmdInput) {
        cmdInput.focus();
    }

    // body의 다른 부분을 클릭했을 때도 입력창에 포커스를 맞추도록 설정합니다.
    document.body.addEventListener('click', function(event) {
        // 버튼이나 링크, 입력창 자신이 아닌 다른 곳을 클릭했을 때 포커스
        if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'A' && event.target.id !== 'CMDINPUT' && cmdInput) {
            cmdInput.focus();
        }
    });
    
    // 명령어 입력창에 이벤트 리스너를 추가합니다.
    if(cmdInput) {
        cmdInput.addEventListener('keydown', cmd_keydown);
    }

    // 테마 변경 버튼에 이벤트 리스너 추가
    const retroBtn = document.getElementById('retro-btn');
    const newtroBtn = document.getElementById('newtro-btn');

    retroBtn.addEventListener('click', () => switchTheme('retro'));
    newtroBtn.addEventListener('click', () => switchTheme('newtro'));
});

// 명령어 입력 후 Enter 키를 눌렀을 때 실행되는 함수입니다.
function cmd_keydown(event) {
    if (event.key === "Enter") {
        const input = document.getElementById("CMDINPUT");
        const msgBox = document.getElementById("MSGBOX");
        const command = input.value.trim().toUpperCase();

        // 입력된 명령어에 따라 다른 동작을 수행합니다.
        switch (command) {
            case "GO":
                msgBox.innerText = "▶ 이동 중...";
                break;
            case "T":
                msgBox.innerText = "▶ 초기화면으로 이동합니다.";
                window.location.href = "#";
                break;
            case "Z":
                msgBox.innerText = "▶ 새로고침 중...";
                location.reload();
                break;
            case "LO":
                msgBox.innerText = "▶ 로그아웃 되었습니다.";
                break;
            case "X":
                msgBox.innerText = "▶ 브라우저 종료 요청됨";
                break;
            case "H":
                msgBox.innerText = "▶ 도움말: GO / T / Z / LO / X";
                break;
            default:
                msgBox.innerText = `알 수 없는 명령어: "${command}"`;
        }
        
        input.value = "";
    }
}

// --- 테마 변경 로직 ---

// 테마별 이미지 경로
const imageSources = {
    retro: {
        chobo: './images/chobo_retro.png',
        pro: './images/pro_retor.png', // 오타 수정
        god: './images/god_retro.png',
        fight: './images/fight_retro.png'
    },
    newtro: {
        chobo: './images/chobo.png', // 뉴트로 이미지 경로
        pro: './images/pro.png',
        god: './images/god.png',
        fight: './images/fight.png'
    }
};

function switchTheme(theme) {
    const retroBtn = document.getElementById('retro-btn');
    const newtroBtn = document.getElementById('newtro-btn');

    // body의 클래스를 변경하여 테마를 전환
    document.body.className = theme === 'retro' ? 'retro-theme' : 'newtro-theme';

    // 이미지 소스 변경
    const currentSources = imageSources[theme];
    document.getElementById('chobo-img').src = currentSources.chobo;
    document.getElementById('pro-img').src = currentSources.pro;
    document.getElementById('god-img').src = currentSources.god;
    document.getElementById('fight-img').src = currentSources.fight;

    // 버튼 활성화 상태 변경
    if (theme === 'retro') {
        retroBtn.classList.add('active');
        newtroBtn.classList.remove('active');
    } else {
        newtroBtn.classList.add('active');
        retroBtn.classList.remove('active');
    }
}
