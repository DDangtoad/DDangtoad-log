---
title: "롯데카드 개인신용정보 유출 사고"
date: 2025-12-10
description: "롯데카드 개인신용정보 유출 사고의 개요, 공격 경로와 후속 대응을 정리합니다."
tags:
  - "분석"
  - "보안 사고 사례 분석"
---

<p data-ke-size="size16">2025년 8월 14 - 15일경 발생하고, 2025년 9월 18일 공식 발표된 롯데카드 개인신용정보 유출 사고.</p>
<p data-ke-size="size16">금융 기관인 만큼 유출된 개인정보(대규모 개인정보 유출 사태)가 많아 상당히 우려되는 보안 사고다.</p>
<p data-ke-size="size16">&nbsp;</p>
<h3 data-ke-size="size23">사건개요</h3>
<p data-ke-size="size16">발생일: 2025.08.14 - 2025.08.15</p>
<p data-ke-size="size16">신고일: 2025.09.01</p>
<p data-ke-size="size16">공식 발표일: 2025.09.18</p>
<p data-ke-size="size16">가해자: 불명으로 현 조사 중</p>
<p data-ke-size="size16">피해 기업: 롯데카드</p>
<p data-ke-size="size16">피해자: 롯데카드 이용자</p>
<p data-ke-size="size16">유형: 정보 유출</p>
<p data-ke-size="size16">주원인: 해킹으로 인한 악성코드 감염</p>
<p data-ke-size="size16">해킹 피해: 악성코드 2종, 웹쉘 5종 발견, 서버 3대 감염</p>
<h4 data-ke-size="size20">유출 정보</h4>
<p data-ke-size="size16">데이터 약 200GB (내부용 업무 자료 포함)</p>
<p data-ke-size="size16">약 222만 명의 고객 온라인 결제 정보 및 암호화된 카드 번호</p>
<p data-ke-size="size16">약 47만 명의 고객 개인정보(CI, 주민등록번호)</p>
<p data-ke-size="size16">약 22만 명의 고객 카드번호, 비밀번호, 유효기간, CVC, 개인정보(CI,&nbsp;주민등록번호,&nbsp;생년월일,&nbsp;전화번호&nbsp;등)</p>
<p data-ke-size="size16">사고 원인</p>
<p data-ke-size="size16">&nbsp;</p>
<h3 data-ke-size="size23">사고의 진행과정</h3>
<p><figure class="imageblock alignCenter" data-ke-mobileStyle="widthOrigin" data-origin-width="1177" data-origin-height="631"><span data-url="https://blog.kakaocdn.net/dn/DbvnL/dJMcai2RE29/uTm5Hsc6SASarXhJbuwTeK/img.png" data-phocus="https://blog.kakaocdn.net/dn/DbvnL/dJMcai2RE29/uTm5Hsc6SASarXhJbuwTeK/img.png" data-alt="https://www.khan.co.kr/article/202509181346001#ENT"><img src="https://blog.kakaocdn.net/dn/DbvnL/dJMcai2RE29/uTm5Hsc6SASarXhJbuwTeK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDbvnL%2FdJMcai2RE29%2FuTm5Hsc6SASarXhJbuwTeK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1177" height="631" data-origin-width="1177" data-origin-height="631"/></span><figcaption>https://www.khan.co.kr/article/202509181346001#ENT</figcaption>
</figure>
</p>
<p data-path-to-node="2" data-ke-size="size16">2025.08.26</p>
<ul style="list-style-type: disc;" data-path-to-node="3" data-ke-list-type="disc">
<li>해킹 사고 발생:&nbsp;공격자가 오라클 웹로직(Oracle WebLogic) 서버의 구형 취약점(CVE-2017-10271)을 악용하여 침투.
<ul style="list-style-type: disc;" data-path-to-node="3,0,1" data-ke-list-type="disc">
<li>해당 취약점은 2017년에 패치가 나왔으나, 관리 부실로 방치.</li>
<li>해커는 웹쉘(Web Shell) 악성코드를 심어 내부망 장악 및 원격 명령 실행을 시도함.</li>
</ul>
</li>
</ul>
<p data-path-to-node="4" data-ke-size="size16">2025.8.(월 말 추정)</p>
<ul style="list-style-type: disc;" data-path-to-node="5" data-ke-list-type="disc">
<li>자체 조사:&nbsp;롯데카드, 일부 서버의 악성코드 감염 확인 후 정밀 조사 착수.
<ul style="list-style-type: disc;" data-path-to-node="5,0,1" data-ke-list-type="disc">
<li>조사 결과: 서버 3개에서 악성코드 2종과 웹쉘 5종 발견.</li>
</ul>
</li>
</ul>
<p data-path-to-node="6" data-ke-size="size16">2025.09.01</p>
<ul style="list-style-type: disc;" data-path-to-node="7" data-ke-list-type="disc">
<li>당국 신고:&nbsp;롯데카드, 금융감독 기관에 해킹 사실 신고.</li>
<li>초기 보고:&nbsp;데이터 유출 규모를 약 1.7GB 수준으로 보고함.</li>
</ul>
<p data-path-to-node="8" data-ke-size="size16">2025.9.(초 - 중순)</p>
<ul style="list-style-type: disc;" data-path-to-node="9" data-ke-list-type="disc">
<li>금감원 현장 점검:&nbsp;금융당국의 조사 결과, 실제 피해 규모가 당초 보고의 약 100배인 200GB에 육박하는 것으로 밝혀짐.
<ul style="list-style-type: disc;" data-path-to-node="9,0,1" data-ke-list-type="disc">
<li>유출 내역: 내부 업무 자료뿐만 아니라, 고객 카드번호, 유효기간, 결제내역 등 민감 정보 포함 확인.</li>
</ul>
</li>
</ul>
<p data-path-to-node="10" data-ke-size="size16">2025.09.18 13:30</p>
<ul style="list-style-type: disc;" data-path-to-node="11" data-ke-list-type="disc">
<li>대국민 사과:&nbsp;조좌진 롯데카드 대표, 서울 중구 부영태평빌딩에서 기자회견 개최.
<ul style="list-style-type: disc;" data-path-to-node="11,0,1" data-ke-list-type="disc">
<li>"심려를 끼쳐 진심으로 죄송하다"며 사과 및 피해 보상안 발표.</li>
<li>2014년 개인정보 대량 유출 사태 이후 정확히 11년 8개월 만의 재사과.</li>
</ul>
</li>
</ul>
<p data-path-to-node="12" data-ke-size="size16">2025.11.10</p>
<ul style="list-style-type: disc;" data-path-to-node="13" data-ke-list-type="disc">
<li>정기검사: (11월 7일 기준) 지난달 말 롯데카드 해킹 사고 관련 수시검사 종료 및 10부터 정기검사 돌입 예정.<br /><a href="https://news.einfomax.co.kr/news/articleView.html?idxno=4382866" target="_blank" rel="noopener&nbsp;noreferrer">https://news.einfomax.co.kr/news/articleView.html?idxno=4382866</a></li>
</ul>
<p data-ke-size="size16">&nbsp;</p>
<h3 data-ke-size="size23">롯데카드 측 보상안</h3>
<p data-ke-size="size16">피해 발생 경우: 금액 전체 보상 등.</p>
<p data-ke-size="size16">정보 유출 확인 회원 대상: 카드사용 알림 서비스 or 크레딧&nbsp;케어 서비스를 당해 말까지 무료 제공, 연말까지 무이자 10개월 할부</p>
<p data-ke-size="size16">CVC와 카드 비밀번호 유출 회원: 카드를 실제로 재발급한 고객들에게 내년도(2026) 카드 연회비 면제.</p>
<p data-ke-size="size16">&nbsp;</p>
<h3 data-ke-size="size23">CVE-2017-10271</h3>
<p data-ke-size="size16">오라클 웹로직 <b>서버의 원격 코드 실행(RCE)&nbsp;</b>취약점.</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>영향 버전:&nbsp;Oracle WebLogic Server 10.3.6.0, 12.1.3.0 등</li>
<li>공격 난이도: 낮음 (공격 경로와 PoC 다수 공개</li>
<li>피해 영향:&nbsp;원격 명령 실행, 데이터 유출, 추가 네트워크 침투 가능</li>
<li>취약점 공개 일시: 2017년</li>
<li>패치 여부: 오라클에서는 즉시 패치 제공.</li>
<li>롯데카드&nbsp;사건에서&nbsp;공격자가&nbsp;침투한&nbsp;방식:&nbsp;해당&nbsp;취약점을&nbsp;이용하여&nbsp;/wls-wsat/CoordinatorPortType와&nbsp;같은&nbsp;SOAP/XML&nbsp;인터페이스에&nbsp;악성&nbsp;Payload를&nbsp;전달.&nbsp;결과적으로&nbsp;웹쉘&nbsp;업로드에&nbsp;성공.</li>
</ul>
<p data-ke-size="size16"><a href="https://www.criminalip.io/ko/knowledge-hub/blog/29651">https://www.criminalip.io/ko/knowledge-hub/blog/29651</a></p>
<figure id="og_1765369109991" contenteditable="false" data-ke-type="opengraph" data-ke-align="alignCenter" data-og-type="website" data-og-title="Cybersecurity Search Engine | Criminal IP" data-og-description="" data-og-host="www.criminalip.io" data-og-source-url="https://www.criminalip.io/ko/knowledge-hub/blog/29651" data-og-url="https://www.criminalip.io/ko/knowledge-hub/blog/29651" data-og-image="https://scrap.kakaocdn.net/dn/btnjoH/hyZPhnslDP/dK3lf1VkoeJqwRBmvyNGjK/img.png?width=1200&amp;height=630&amp;face=0_0_1200_630"><a href="https://www.criminalip.io/ko/knowledge-hub/blog/29651" target="_blank" rel="noopener" data-source-url="https://www.criminalip.io/ko/knowledge-hub/blog/29651">
<div class="og-image" style="background-image: url('https://scrap.kakaocdn.net/dn/btnjoH/hyZPhnslDP/dK3lf1VkoeJqwRBmvyNGjK/img.png?width=1200&amp;height=630&amp;face=0_0_1200_630');">&nbsp;</div>
<div class="og-text">
<p class="og-title" data-ke-size="size16">Cybersecurity Search Engine | Criminal IP</p>
<p class="og-desc" data-ke-size="size16">&nbsp;</p>
<p class="og-host" data-ke-size="size16">www.criminalip.io</p>
</div>
</a></figure>
<p data-ke-size="size16"><a href="https://knvd.krcert.or.kr/elkDetail.do?CVEID=CVE-2017-10271&amp;jvn=&amp;CVEID=CNNVD-201710-829&amp;dilen=60c07113dd82393915a66629" target="_blank" rel="noopener&nbsp;noreferrer">https://knvd.krcert.or.kr/elkDetail.do?CVEID=CVE-2017-10271&amp;jvn=&amp;CVEID=CNNVD-201710-829&amp;dilen=60c07113dd82393915a66629</a></p>
<figure id="og_1765369213679" contenteditable="false" data-ke-type="opengraph" data-ke-align="alignCenter" data-og-type="website" data-og-title="보안 취약점  정보 포털" data-og-description="취약점 세부내용 jvn : cnnvd : ※주의 : 한글 세부 내용은 구글 번역기를 통한 한글 번역으로 참고만 가능합니다." data-og-host="knvd.krcert.or.kr" data-og-source-url="https://knvd.krcert.or.kr/elkDetail.do?CVEID=CVE-2017-10271&amp;jvn=&amp;CVEID=CNNVD-201710-829&amp;dilen=60c07113dd82393915a66629" data-og-url="https://knvd.krcert.or.kr/elkDetail.do?CVEID=CVE-2017-10271&amp;CVEID=CNNVD-201710-829&amp;dilen=60c07113dd82393915a66629&amp;jvn=" data-og-image=""><a href="https://knvd.krcert.or.kr/elkDetail.do?CVEID=CVE-2017-10271&amp;jvn=&amp;CVEID=CNNVD-201710-829&amp;dilen=60c07113dd82393915a66629" target="_blank" rel="noopener" data-source-url="https://knvd.krcert.or.kr/elkDetail.do?CVEID=CVE-2017-10271&amp;jvn=&amp;CVEID=CNNVD-201710-829&amp;dilen=60c07113dd82393915a66629">
<div class="og-image" style="background-image: url();">&nbsp;</div>
<div class="og-text">
<p class="og-title" data-ke-size="size16">보안 취약점 정보 포털</p>
<p class="og-desc" data-ke-size="size16">취약점 세부내용 jvn : cnnvd : ※주의 : 한글 세부 내용은 구글 번역기를 통한 한글 번역으로 참고만 가능합니다.</p>
<p class="og-host" data-ke-size="size16">knvd.krcert.or.kr</p>
</div>
</a></figure>
<p data-ke-size="size16"><a href="https://www.oracle.com/security-alerts/cpuoct2017.html" target="_blank" rel="noopener&nbsp;noreferrer">https://www.oracle.com/security-alerts/cpuoct2017.html</a></p>
<figure id="og_1765369236121" contenteditable="false" data-ke-type="opengraph" data-ke-align="alignCenter" data-og-type="website" data-og-title="Oracle Critical Patch Update - October 2017" data-og-description="Oracle Critical Patch Update Advisory - October 2017 Description A Critical Patch Update (CPU) is a collection of patches for multiple security vulnerabilities. Critical Patch Update patches are usually cumulative, but each advisory describes only the secu" data-og-host="www.oracle.com" data-og-source-url="https://www.oracle.com/security-alerts/cpuoct2017.html" data-og-url="https://www.oracle.com/security-alerts/cpuoct2017.html" data-og-image=""><a href="https://www.oracle.com/security-alerts/cpuoct2017.html" target="_blank" rel="noopener" data-source-url="https://www.oracle.com/security-alerts/cpuoct2017.html">
<div class="og-image" style="background-image: url();">&nbsp;</div>
<div class="og-text">
<p class="og-title" data-ke-size="size16">Oracle Critical Patch Update - October 2017</p>
<p class="og-desc" data-ke-size="size16">Oracle Critical Patch Update Advisory - October 2017 Description A Critical Patch Update (CPU) is a collection of patches for multiple security vulnerabilities. Critical Patch Update patches are usually cumulative, but each advisory describes only the secu</p>
<p class="og-host" data-ke-size="size16">www.oracle.com</p>
</div>
</a></figure>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">&nbsp;</p>
