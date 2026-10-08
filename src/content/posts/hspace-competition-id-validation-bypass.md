---
title: "[HSPACE] COMPETITION_ID 검증 부재를 통한 대회 팀 생성 및 접근 제어 우회"
date: 2026-03-24
description: "HSPACE 대회 팀 생성 로직의 COMPETITION_ID 검증 부재로 발생하는 접근 제어 우회 취약점을 분석합니다."
tags:
  - "버그바운티"
---

<p data-ke-size="size16">작성자: DDangtoad(김채은)</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>대상: forge.hspace.io</li>
<li>엔드포인트: POST /competitions/[COMPETITION_ID]</li>
<li>취약점 유형:
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>Broken Access Control (IDOR)</li>
<li>Business Logic Error</li>
<li>Improper Input Validation</li>
</ul>
</li>
</ul>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">개요</h3>
<p data-ke-size="size16">forge.hspace.io의 팀 생성 및 대회 참여 로직에서 competition-id에 대한 서버 측 검증 부재 취약점이 발견되었습니다.</p>
<p data-ke-size="size16">서버는 클라이언트가 전송한 competition-id가 현재 시점에서 유효한지(대회가 진행 중인지) 또는 사용자가 접근 권한을 가졌는지 검증하지 않습니다.</p>
<p data-ke-size="size16">이에 따라 공격자가 간단한 파라미터 조작으로 이미 종료된 대회와 현재 진행 중인 대회에 팀을 생성(데이터 조작) 수 있으며, 자격 증명이 필요한(비공개) 대회 참여까지 동일한 원리로 우회할 수 있니다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">상세</h3>
<p data-ke-size="size16">사용자가 팀 만들기 버튼을 누를 때, 비즈니스 로직을 처리하는 서버는 요청 Body에 포함된 competition-id를 검증 없이 받아들입니다.<br />공격자는 프록시 도구를 사용하여 POST 요청을 가로챈 뒤, competition-id 파라미터를 타겟 대회의 ID로 교체해 전송함으로써 아래의 보안 제어를 우회할 수 있습니다.</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>시간제한 우회: 이미 종료된 대회의 ID를 사용하여 마감된 대회에 팀을 생성.</li>
<li>접근 제어 우회: 서버가 ID와 사용자 권한의 매핑을 검증하지 않으므로, 비공개 대회의 ID를 사용하여 초대 없이 참여 가능.</li>
</ul>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">PoC</h3>
<p data-ke-size="size16">타겟 ID 식별: 원하는 대회의 ID를 확보합니다. (예: 682c1224cae9c2aca1520b05, 종료된 대회)</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="925" data-origin-height="891"><span data-url="https://blog.kakaocdn.net/dn/dnh2Fn/dJMcagSqtRq/MBTnkoZbKek6tw9Ghr0pB1/img.png" data-phocus="https://blog.kakaocdn.net/dn/dnh2Fn/dJMcagSqtRq/MBTnkoZbKek6tw9Ghr0pB1/img.png"><img src="https://blog.kakaocdn.net/dn/dnh2Fn/dJMcagSqtRq/MBTnkoZbKek6tw9Ghr0pB1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdnh2Fn%2FdJMcagSqtRq%2FMBTnkoZbKek6tw9Ghr0pB1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="925" height="891" data-origin-width="925" data-origin-height="891"/></span></figure>
</p>
<p data-ke-size="size16">위에서 얻은 패킷의 URL 부분과 Body 데이터 중 1_competition-id 값을 처음에 확보한 원하는 대회의 ID로 변경합니다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="940" data-origin-height="704"><span data-url="https://blog.kakaocdn.net/dn/dHlf3s/dJMcaaxUp11/fkK8U6RcYkhMs2EohMJMK0/img.png" data-phocus="https://blog.kakaocdn.net/dn/dHlf3s/dJMcaaxUp11/fkK8U6RcYkhMs2EohMJMK0/img.png"><img src="https://blog.kakaocdn.net/dn/dHlf3s/dJMcaaxUp11/fkK8U6RcYkhMs2EohMJMK0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdHlf3s%2FdJMcaaxUp11%2FfkK8U6RcYkhMs2EohMJMK0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="940" height="704" data-origin-width="940" data-origin-height="704"/></span></figure>
</p>
<pre id="code_1774330766381" class="bash" data-ke-language="bash" data-ke-type="codeblock"><code>POST /competitions/[COMPETITION_ID] HTTP/2 //ex: 682c1224cae9c2aca1520b05</code></pre>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="979" data-origin-height="87"><span data-url="https://blog.kakaocdn.net/dn/bobddF/dJMcaiJqiCx/HniVA09WGrD9wKk69bW3w0/img.png" data-phocus="https://blog.kakaocdn.net/dn/bobddF/dJMcaiJqiCx/HniVA09WGrD9wKk69bW3w0/img.png"><img src="https://blog.kakaocdn.net/dn/bobddF/dJMcaiJqiCx/HniVA09WGrD9wKk69bW3w0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbobddF%2FdJMcaiJqiCx%2FHniVA09WGrD9wKk69bW3w0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="979" height="87" data-origin-width="979" data-origin-height="87"/></span></figure>
</p>
<pre id="code_1774330795475" class="bash" data-ke-language="bash" data-ke-type="codeblock"><code>------WebKitFormBoundaryIeAVHa9ksidbvo5X
Content-Disposition: form-data; name="1_competition-id"

[COMPETITION_ID] //ex: 682c1224cae9c2aca1520b05</code></pre>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1030" data-origin-height="188"><span data-url="https://blog.kakaocdn.net/dn/cselv7/dJMcabQ51q1/bYmH2ruGWxJv88jA0N6XC1/img.png" data-phocus="https://blog.kakaocdn.net/dn/cselv7/dJMcabQ51q1/bYmH2ruGWxJv88jA0N6XC1/img.png"><img src="https://blog.kakaocdn.net/dn/cselv7/dJMcabQ51q1/bYmH2ruGWxJv88jA0N6XC1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcselv7%2FdJMcabQ51q1%2FbYmH2ruGWxJv88jA0N6XC1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1030" height="188" data-origin-width="1030" data-origin-height="188"/></span></figure>
</p>
<p data-ke-size="size16">변조된 요청을 전송하면 200ok응답을 받을 수 있습니다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1021" data-origin-height="351"><span data-url="https://blog.kakaocdn.net/dn/bPpPJE/dJMcafsqvLm/TvDTNVqs0cWpkqphHLb9l0/img.png" data-phocus="https://blog.kakaocdn.net/dn/bPpPJE/dJMcafsqvLm/TvDTNVqs0cWpkqphHLb9l0/img.png"><img src="https://blog.kakaocdn.net/dn/bPpPJE/dJMcafsqvLm/TvDTNVqs0cWpkqphHLb9l0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbPpPJE%2FdJMcafsqvLm%2FTvDTNVqs0cWpkqphHLb9l0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1021" height="351" data-origin-width="1021" data-origin-height="351"/></span></figure>
</p>
<p data-ke-size="size16">이후 확인해 보면 실제 해당 종료된 대회의 참가 팀 목록에 새로운 팀이 생성된 것을 확인할 수 있습니다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-filename="blob" data-origin-width="951" data-origin-height="1144"><span data-url="https://blog.kakaocdn.net/dn/o93YV/dJMcac3wtmt/sppEBcDdvwB8ZIb7aChiak/img.png" data-phocus="https://blog.kakaocdn.net/dn/o93YV/dJMcac3wtmt/sppEBcDdvwB8ZIb7aChiak/img.png"><img src="https://blog.kakaocdn.net/dn/o93YV/dJMcac3wtmt/sppEBcDdvwB8ZIb7aChiak/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fo93YV%2FdJMcac3wtmt%2FsppEBcDdvwB8ZIb7aChiak%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="951" height="1144" data-filename="blob" data-origin-width="951" data-origin-height="1144"/></span></figure>
</p>
<p data-ke-size="size16">아래는 여러 사례 입니다. 모두 동일한 PoC로 가능합니다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-filename="blob" data-origin-width="1163" data-origin-height="1132"><span data-url="https://blog.kakaocdn.net/dn/mrP6p/dJMcab4DqCT/BLP4i1auVHeDOdiUPWvL01/img.png" data-phocus="https://blog.kakaocdn.net/dn/mrP6p/dJMcab4DqCT/BLP4i1auVHeDOdiUPWvL01/img.png"><img src="https://blog.kakaocdn.net/dn/mrP6p/dJMcab4DqCT/BLP4i1auVHeDOdiUPWvL01/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmrP6p%2FdJMcab4DqCT%2FBLP4i1auVHeDOdiUPWvL01%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1163" height="1132" data-filename="blob" data-origin-width="1163" data-origin-height="1132"/></span></figure>
</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">영향</h3>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>무결성 위협: 공격자는 종료된 대회에 참가해 데이터 무결성을 침해할 수 있습니다.</li>
<li>접근 제어 무력화: 근본적인 원인이 competition-id에 대한 컨텍스트 검증 부재이므로, 이는 곧 비공개 대회의 보안 매커니즘을 무력화할 수 있음을 의미합니다.</li>
<li>공격자는 자격이 없는 대회에 참여해 랭킹을 오염 시킬 가능성이 있습니다.</li>
</ul>
<p data-ke-size="size16">&nbsp;</p>
