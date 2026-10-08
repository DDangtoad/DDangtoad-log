---
title: "쿠팡 개인정보 유출 사건"
date: 2025-12-09
description: "쿠팡 개인정보 유출 사건의 피해 규모, 원인과 보안상 시사점을 정리합니다."
tags:
  - "분석"
  - "보안 사고 사례 분석"
  - "개인정보"
  - "보안"
  - "쿠팡"
  - "해킹"
---

<p data-ke-size="size16">많은 사람들이 이용하는 쿠팡.</p>
<p data-ke-size="size16">해당 서비스에서 개인정보 유출 사건이 일어났다.</p>
<h3 data-ke-size="size23">사건개요</h3>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>피해 기업: 쿠팡</li>
<li>피해자: 쿠팡 전체 이용자 (약 3,370만 명)</li>
<li>피의자: 미상(2025.12.09 기준, 경찰은 외국 국적의 쿠팡 전 직원 소행에 무게를 두고 수사 중)</li>
<li>해킹 발생일: 2025.06.24 - 2025.11.8</li>
<li>해킹 신고일: 2025.11.19</li>
<li>공식 발표일: 2025.11.20</li>
<li>유형: 개인 정보 유출</li>
<li>유출 정보: 가입자 이름, 이메일, 주문정보, 배송지</li>
</ul>
<h3 data-ke-size="size23">사고 원인</h3>
<p data-ke-size="size16">로그인에 필요한 토큰 관리에서 미흡하여 발생한 사건.</p>
<p data-ke-size="size16">쿠팡측은 토큰을 생성하고 즉시 폐기해야 하는 상황임에도 토큰 생성에 필요한 서명 정보를 담당 직원이 퇴사하였을 때 삭제하거나 갱신하지 않고 이를 방치하여 퇴사한 내부직원이 이를 악용한 사건이다.</p>
<p data-ke-size="size16">해당 사례에서는 인증 관련 담당자의 접근 토큰의 유효 인증키로 인하여 발생하였다.</p>
<p data-ke-size="size16">한마디로 일회용 열쇠(토큰)에 정품인증을 해주는 도장(인증키)을 방치한 나머지 권한이 없는 사람이 도장을 몰래 사용한것이다.</p>
<h3 data-ke-size="size23">사고의 진행과정</h3>
<p data-ke-size="size16">2025.06.24</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>최초 침입: 해외 서버를 통한 비정상적인 접근 시작 (추후 조사로 밝혀짐).</li>
<li>이후 약 5개월간 쿠팡 측은 해당 사실을 전혀 인지하지 못함.</li>
</ul>
<p data-ke-size="size16">2025.11.06 18:38</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>해킹 기록 발생: 액세스 토큰을 악용한 비인가 접근 기록이 남았으나, 보안 시스템이 감지하지 못하고 넘어감.</li>
</ul>
<p data-ke-size="size16">2025.11.18 22:52</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>사태 인지: 자체 탐지가 아닌 고객의 민원을 통해 침해 사실을 뒤늦게 파악함.</li>
</ul>
<p data-ke-size="size16">2025.11.19 21:35</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>관계 기관 신고: 쿠팡, 피해 규모를 약 4,536개 계정으로 축소하여 신고.</li>
<li>원인을 서명된 액세스 토큰 악용으로 추정.</li>
</ul>
<p data-ke-size="size16">2025.11.20</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>고객 통지 및 입장문:
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>피해 고객에게 문자 발송 (그러나, 정확한 유출 시점 누락)</li>
<li>입장문 발표: "외부 침입 흔적이나 결제 정보 접근은 없었다"라고 해명.</li>
</ul>
</li>
</ul>
<p data-ke-size="size16">2025.11.29</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>최종 피해 규모: 후속 조사 결과, 총 3,370만 개 계정 유출 확인.
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>활성 고객 수(2,470만 명)를 초과, 사실상 전체 회원 및 탈퇴 회원 정보까지 털렸다는 뜻.</li>
<li>유출 정보: 이름, 이메일, 휴대전화 번호, 주소(공동현관 비밀번호 포함), 최근 주문 5건.</li>
</ul>
</li>
<li>정부 대응: 과기부&middot;개보위, 조사 착수 발표.</li>
</ul>
<h3 data-ke-size="size23">2차 피해 가능성과 대응방법</h3>
<p data-ke-size="size16">유출된 정보가 보이스 피싱에 악용될 우려가 있다.</p>
<p data-ke-size="size16">따라서 통상적인 보이스피싱 대처법으로 불명의 문자에 적힌 링크나 모르는 번호로 걸려온 전화에 응답해서는 안된다.</p>
<p data-ke-size="size16">이외로 개인통관고유부호를 바꾸고, 등록해 두었던 카드나 통장을 바꾸는 방법도 존재한다.</p>
<p data-ke-size="size16">이렇게 직접적으로 유출된 정보를 이용하는 방법 말고도 불안 그 자체를 이용하는 스미싱도 성행 중이다.</p>
<p data-ke-size="size16">예를 들어 "보상 신청하라", "피해 사실 조회" 등의 말로 유도하여 가짜 사이트와 악성 앱을 설치하게 만드는 경우가 있다.</p>
<p data-ke-size="size16">만약 이미 내 정보가 유출된 것 같다면 신속한 대응이 필수적이다. 만약 악성 앱이 설치된 것으로 의심된다면 즉시 삭제하거나 서비스센터를 방문해 초기화해야 한다. 이미 금융 서비스를 이용했다면 공인인증서와 보안카드를 즉시 폐기하고 재발급받아야 한다. <a title="출처" href="https://lawtalknews.co.kr/article/4HH9YU812ORJ">https://lawtalknews.co.kr/article/4HH9YU812ORJ</a></p>
<p><figure class="imageblock alignLeft" data-ke-mobileStyle="widthOrigin" data-origin-width="1279" data-origin-height="1547"><span data-url="https://blog.kakaocdn.net/dn/cvF12g/dJMcagD22mQ/BiCYiEy86PFokzKKIeILIK/img.png" data-phocus="https://blog.kakaocdn.net/dn/cvF12g/dJMcagD22mQ/BiCYiEy86PFokzKKIeILIK/img.png" data-alt="한국인터넷진흥원 인스타그램에 올라온 사진"><img src="https://blog.kakaocdn.net/dn/cvF12g/dJMcagD22mQ/BiCYiEy86PFokzKKIeILIK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcvF12g%2FdJMcagD22mQ%2FBiCYiEy86PFokzKKIeILIK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="346" height="419" data-origin-width="1279" data-origin-height="1547"/></span><figcaption>한국인터넷진흥원 인스타그램에 올라온 사진</figcaption>
</figure>
</p>
<h3 data-ke-size="size23">손해배상과 과징금</h3>
<p data-ke-size="size16">쿠팡의 최대 과징금 전망: 수천억 - 1조 2천억 원대(이론상 계산)</p>
<p data-ke-size="size16">손해배상 가능성:</p>
<p data-ke-size="size16">과거 인터파크 사례에서는 10만 원 선에서 배상액이 확정되었다. 그러나 관리 부실 책임이 사실로 드러날 경우 배상액이 15-20만 원까지 늘어날 수 있다는 분석도 나온다. 그러나 과거 2011년 네이트&middot;싸이월드 사건처럼 실제 금전적 피해(보이스피싱 등)를 입증하지 못하면 1심에서 이기고도 2심에서 "배상 책임 없음"으로 뒤집힐 위험도 있다.</p>
<h3 data-ke-size="size23">타 기업에 미친 영향</h3>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>G마켓: 주말 내 자체 긴급 보안점검을 실시, 후속 점검 방안도 논의</li>
<li>SSG닷컴: 정기, 수시 점검과 내부 통제를 지속 강화</li>
<li>롯데온: 자체 긴급 보안점검 실시, 점검 계획 추가 수립 및 진행 계획</li>
<li>11번가: 이번 이슈와 관련해 서버&middot;DB 접속 이력을 재점검할 예정</li>
<li>컬리: 이번 사태를 계기로 정기 보안 점검과 별도로 유사 유형의 사고 발생 가능성을 줄이기 위한 선제적 점검과 내부통제를 진행 중</li>
</ul>
