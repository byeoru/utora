export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col gap-8 font-notoKr py-5">
      <h1 className="text-xl font-bold">개인정보처리방침</h1>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">1. 목적</h2>
        <p>
          본 개인정보처리 방침은 유토라(이하 “사이트”라 합니다)가 제공하는
          서비스(이하 “서비스”)의 이용과 관련하여, 사이트의 회원으로 가입한 뒤
          서비스를 이용하는 회원(이하 “회원”)으로부터 수집하는 개인정보 및 그
          개인정보의 사용방법 등에 관한 제반 사항을 규정하기 위해
          준비되었습니다. 본 개인정보처리 방침은 사이트의 재량에 따라 별도 고지
          없이 변경될 수 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">2. 개인정보 수집</h2>
        <p className="text-green-600 font-medium">
          서비스 제공을 위하여 회원 가입 시 필요한 최소한의 개인정보를
          수집합니다.
        </p>
        <p>
          서비스 제공을 위해 반드시 필요한 최소한의 정보를 필수 항목으로, 그 외
          서비스를 제공하기 위해 추가 수집하는 정보는 선택항목으로 동의를 받고
          있으며, 선택항목에 동의하지 않은 경우 토론 관련 서비스를 이용하실 수
          없습니다.
        </p>
        <p>[필수]</p>
        <p>이메일, 비밀번호, 닉네임</p>
        <p>[선택]</p>
        <p>연령층, 성별</p>
        <br />
        <p className="text-green-600 font-medium">
          개인정보를 수집하는 방법은 아래와 같습니다.
        </p>
        <p>
          개인정보를 수집하는 경우에는 원칙적으로 사전에 이용자에게 해당 사실을
          알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해 개인정보를
          수집합니다.
        </p>
        <li className="list-disc">
          회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를
          하고 직접 정보를 입력하는 경우
        </li>
        <br />
        <p className="text-green-600 font-medium">
          서비스 이용과정에서 아래와 같은 정보들이 생성되어 수집될 수 있습니다.
        </p>
        <li className="list-disc">쿠키</li>
        <li className="list-disc">접속 IP 정보</li>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">3. 개인정보 이용</h2>
        <p className="text-green-600 font-medium">
          회원관리를 위해 이용합니다.
        </p>
        <li className="list-disc">회원 식별/가입 의사 확인, 본인/연령 확인</li>
        <li className="list-disc">이메일/닉네임 중복 방지</li>
        <br />
        <p className="text-green-600 font-medium">
          통계분석을 위해 이용합니다.
        </p>
        <li className="list-disc">성별, 연령층에 따른 토론 주제 관심도 분석</li>
        <li className="list-disc">토론 결과 투표 분석</li>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">4. 개인정보 제공</h2>
        <p className="text-green-600 font-medium">
          사이트는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다.
          단 아래의 경우에는 예외로 합니다.
        </p>
        <li className="list-disc">
          이용자의 생명이나 안전에 급박한 위험이 확인되어 조치를 위할 경우
        </li>
        <li className="list-disc">
          관계 법령에 근거하여 수사, 재판 또는 행정상의 목적으로 관계
          기관으로부터 요구가 있을 경우
        </li>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          5. 개인정보 자동 수집 장치에 관한 사항 (설치·운영 및 거부)
        </h2>
        <p className="text-green-600 font-medium">
          안전하고 편리한 서비스 제공을 위하여 암호화된 쿠키를 설치·운영합니다.
        </p>
        <br />
        <p className="font-medium">쿠키란</p>
        <p>
          이용자가 웹사이트를 접속할 때 해당 웹사이트에서 이용자의 브라우저에
          보내는 아주 작은 텍스트 파일로 이용자 PC에 저장됩니다.
        </p>
        <br />
        <p className="font-medium">사용목적</p>
        <li className="list-disc">자동 로그인</li>
        <li className="list-disc">접속 로그 기록 관련 용도</li>
        <br />
        <p className="font-medium">쿠키 수집 거부</p>
        <p>
          이용자는 쿠키 설치에 대한 선택권을 가지고 있으며, 웹브라우저 상단의
          ‘설정 &gt; 개인정보보호 &gt; 쿠키 및 기타 사이트 데이터’ 경로에서 쿠키
          설정을 통해 쿠키 허용 및 거부를 할 수 있습니다. 다만, 쿠키 설치를
          거부할 경우 웹 사용이 불편해지며, 로그인이 필요한 일부 서비스 이용이
          어려울 수 있습니다.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          6. 개인정보의 파기절차 및 방법
        </h2>
        <p className="text-green-600 font-medium">
          수집 및 이용목적이 달성된 경우 수집한 개인정보는 지체 없이 파기하며,
          절차 및 방법은 아래와 같습니다.
        </p>
        <p>
          수집 및 이용 목적의 달성 또는 회원 탈퇴 등 파기 사유가 발생한 경우
          개인정보의 형태를 고려하여 파기방법을 정합니다. 전자적 파일 형태인
          경우 복구 및 재생되지 않도록 안전하게 삭제하고, 그 밖에 기록물,
          인쇄물, 서면 등의 경우 분쇄하거나 소각하여 파기합니다.
        </p>
        <br />
        <p className="text-green-600 font-medium">
          다음 정보는 회원 탈퇴 시 즉시 파기됩니다.
        </p>
        <li className="list-disc">
          회원 가입 및 관리 목적으로 수집된 개인 정보(이메일, 비밀번호, 닉네임)
        </li>
        <li className="list-disc">
          통계 분석을 위해 수집된 개인 정보(성별, 연령층)
        </li>
        <br />
        <p className="text-green-600 font-medium">
          다음 정보는 아래의 이유로 명시한 기간 동안 보존합니다.
        </p>
        <p className="font-medium">접속 기록</p>
        <li className="list-disc">보존 기간: 3개월</li>
        <li className="list-disc">
          보존 이유: 통신비밀 보호법 통신 사실 확인자료(로그기록 자료)
        </li>
      </div>
      <div className="flex flex-col gap-2 list-disc">
        <h2 className="text-lg font-semibold">
          7. 이용자 및 법정대리인의 권리와 행사 방법
        </h2>
        <li>
          회원은 언제든지 ‘내 정보’에서 자신의 개인정보를 조회하거나 수정·삭제할
          수 있으며, 자신의 개인 정보에 대한 열람을 요청할 수 있습니다.
        </li>
        <li>
          회원은 언제든지 개인정보 처리의 정지를 요청할 수 있으며, 법률에 특별한
          규정이 있는 등의 경우에는 처리정지 요청을 거부할 수 있습니다.
        </li>
        <li>
          회원은 언제든지 ‘회원 탈퇴’ 등을 통해 개인정보의 수집 및 이용 동의를
          철회할 수 있습니다.
        </li>
      </div>
      <div className="flex flex-col gap-2 list-disc">
        <h2 className="text-lg font-semibold">8. 개인정보의 처리 위탁</h2>
        <p>
          사이트는 회원에게 보다 나은 서비스의 제공을 위하여 다음과 같이
          개인정보의 처리 업무를 위탁하고 있습니다. 사이트는 개인정보 처리
          업무의 위탁을 받은 수탁자가 개인정보보호법 등 현행 개인정보보호 관계
          법령을 위반하지 않도록 관리/감독을 하고 있습니다.
        </p>
        <br />
        <p className="font-medium">서버 등 관련</p>
        <li>수탁자: Supabase</li>
        <li>
          위탁 업무 내용: 데이터베이스 호스팅 및 관리, 실시간 데이터 스트리밍 및
          메시징 서비스
        </li>
        <li>
          개인정보의 보유 및 이용 기간: 회원 탈퇴 시 또는 위탁 계약 종료 시까지
        </li>
      </div>
      <div className="flex flex-col gap-2 list-disc">
        <h2 className="text-lg font-semibold">9. 개인정보보호를 위한 노력</h2>
        <p>
          사이트는 회원의 개인정보를 안전하게 관리하기 위해서 최선을 다하고
          있습니다.
        </p>
        <p>
          회원의 개인정보는 보호된 시스템에서 관리되고 있으며, 전송 데이터를
          암호화하여 보호합니다.
        </p>
      </div>
      <div className="flex flex-col gap-2 list-disc">
        <h2 className="text-lg font-semibold">
          10. 개인정보 보호 책임자 (개인정보 열람 등 처리 담당자)
        </h2>
        <li>성명: 최병규</li>
        <li>이메일주소: byeorudev@gmail.com</li>
      </div>
      <div className="flex flex-col gap-2 list-disc">
        <h2 className="text-lg font-semibold">11. 권익 침해 구제방법</h2>
        <p>
          회원은 개인정보 침해로 인한 구제를 받기 위하여 개인정보분쟁
          조정위원회, 한국 인터넷진흥원, 개인정보 침해신고센터 등에 분쟁
          해결이나 상담 등을 신청할 수 있습니다. 기타 개인정보 침해의 신고,
          상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
        </p>
        <li>개인정보분쟁조정위원회: (국번없이) 1833-6972 (www.kopico.go.kr)</li>
        <li>개인정보침해신고센터: (국번없이) 118 (privacy.kisa.or.kr)</li>
        <li>대검찰청: (국번없이) 1301 (www.spo.go.kr)</li>
        <li>경찰청: (국번없이) 182 (cyberbureau.police.go.kr)</li>
      </div>
      <div className="flex flex-col gap-2 list-disc">
        <h2 className="text-lg font-semibold">
          12. 개인정보처리방침 변경에 관한 사항
        </h2>
        <p>
          사이트는 법령 등 신설 및 개정 등에 따라 본 개인정보처리방침에 관한
          수정, 정정, 변경, 추가, 삭제 등을 할 경우 그 변경 사항의 시행 7일
          전부터 웹사이트의 공지사항 등을 통해 회원에게 고지할 것입니다. 다만,
          수집하는 개인정보의 항목이나 이용 목적 등을 변경함으로써 회원의 권리에
          변경이 없거나 회원에게만 이익이 발생되는 경우 그 변경 사항의
          시행일로부터 최소 7일 전에 공지하고, 회원의 권리에 중대한 변경이
          발생되는 경우 그 변경 사항의 시행일로부터 최소 30일 전에 공지하며,
          필요시 회원의 재동의를 받을 수 있습니다.
        </p>
        <br />
        <li>공고일자: 2024년 5월 21일</li>
        <li>시행일자: 2024년 5월 21일</li>
      </div>
    </div>
  );
}
