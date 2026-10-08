---
title: "[HSPACE] OAuth 2.0 Redirect URI 검증 우회 및 Callback 엔드포인트를 통한 사용자 납치 취약점"
date: 2026-03-24
description: "HSPACE OAuth 인증 과정의 Redirect URI 검증 우회와 Callback 엔드포인트 체이닝 취약점을 분석합니다."
tags:
  - "버그바운티"
---

<p data-ke-size="size16">작성자: DDangtoad(김채은)</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">대상: forge.hspace.io</p>
<p data-ke-size="size16">취약한 구성 요소: auth-prod.hspace.io</p>
<p data-ke-size="size16">취약점 유형:</p>
<p data-ke-size="size16">OAuth Misconfiguration</p>
<p data-ke-size="size16">Open Redirect</p>
<p data-ke-size="size16">Security Control Bypass</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">개요</h3>
<p data-ke-size="size16">&ldquo;forge.hspace.io&rdquo;에 로그인 할 때 필수로 거쳐야 하는</p>
<p data-ke-size="size16">&ldquo;auth-prod.hspace.io&rdquo;의 OAuth 인증 로직에서 &ldquo;redirect_back_to&rdquo; 파라미터에 대한 검증 미흡으로 인해 Open Redirect 취약점이 존재합니다.<br />내부 Open Redirect 취약점(/cb)과 체이닝하여 우회할 수 있습니다.<br />이로 인해 공격자는 엄격하게 화이트리스트로 관리되어야 할 redirect_uri 정책을 무력화하고, 인증이 완료된 피해자를 즉시 임의의 외부 도메인으로 리다이렉트 시킬 수 있습니다.</p>
<p data-ke-size="size16">즉, 공격자가 신뢰된 도메인을 징검다리로 사용하여, OAuth 인증 직후 사용자를 피싱 사이트로 납치할 수 있다. 이는 OAuth 프로토콜의 핵심 보안 요구사항인 "사전에 등록된 URI로만 이동한다"라는 규칙(Redirect URI 검증)을 위반합니다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">상세</h3>
<p data-ke-size="size16">OAuth 2.0 인증 코드 부여 흐름에서 아래와 같은 보안 결함이 존재합니다.</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>Open Redirect 검증 우회: 초기 인증 요청 시 &ldquo;redirect_back_to&rdquo; 파라미터에 이중 리다이렉트 구조&rdquo;.../cb?redirect=attacker.com&rdquo;를 사용할 경우, 도메인 검증 로직이 이를 정상적인 내부 경로&rdquo;forge.hspace.io"로 오판하여 허용합니다.</li>
<li>사용자가 로그인을 완료하면 서버는 /cb 엔드포인트로 이동한 뒤, 즉시 공격자가 주입한 attacker.com으로 307 Temporary Redirect 응답을 보냅니다. 이는 OAuth 2.0 표준(Strict Redirect URI) 위반입니다.</li>
<li>인증 정보 노출 위험:<br />서버가 응답 시 Location 헤더에 코드를 직접 붙이지 않더라도, 리다이렉트 직전의 URL인 /cb?redirect=...&amp;code=XXXX에는 이미 유효한 Authorization Code가 포함되어 있습니다.</li>
<li>즉, 피해자는 신뢰하는 도메인에서 인증을 마친 직후 공격자가 제어하는 외부 서버(attacker.com) 로 납치됩니다. 이 과정에서 사용자의 환경이나 브라우저 보안 정책에 따라 Referer 헤더를 통해 인증 코드가 공격자 서버 로그에 유출될 가능성이 있습니다.</li>
</ul>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<h3 data-ke-size="size23">PoC</h3>
<p data-ke-size="size16">사용자를 임의의 사이트로 납치(Open Redirect)할 수 있음을 증명하기 위해 두 가지 환경에서 테스트를 진행했습니다.</p>
<ol style="list-style-type: decimal;" data-ke-list-type="decimal">
<li><a href="http://google.com">google.com</a> 납치</li>
</ol>
<pre class="apache"><code>https://auth-prod.hspace.io/v1/auth?provider=google&amp;redirect_back_to=https%3A%2F%2Fforge.hspace.io%2Fcb%3Fredirect%3Dhttps%3A%2F%2Fgoogle.com</code></pre>
<p data-ke-size="size16">피해자가 해당 링크를 통하여 로그인을 시도합니다. (여기서는 작성자 본인의 계정으로 테스트 하였습니다.)</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-filename="blob" data-origin-width="1111" data-origin-height="1151"><span data-url="https://blog.kakaocdn.net/dn/DvW9I/dJMcadOTAvE/zOWdZqZMzMUaEtmGnpTS5K/img.png" data-phocus="https://blog.kakaocdn.net/dn/DvW9I/dJMcadOTAvE/zOWdZqZMzMUaEtmGnpTS5K/img.png"><img src="https://blog.kakaocdn.net/dn/DvW9I/dJMcadOTAvE/zOWdZqZMzMUaEtmGnpTS5K/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FDvW9I%2FdJMcadOTAvE%2FzOWdZqZMzMUaEtmGnpTS5K%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1111" height="1151" data-filename="blob" data-origin-width="1111" data-origin-height="1151"/></span></figure>
</p>
<p data-ke-size="size16">hspace.io(신뢰 도메인)로 이동한다고 나옵니다.</p>
<p data-ke-size="size16">그러나 로그인하면 아래와 같이 공격자 서버(여기서는 구글)로 리다이렉트 됩니다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1094" data-origin-height="542"><span data-url="https://blog.kakaocdn.net/dn/vq9bV/dJMcaivTvjF/NuvxkvDkYeVJ7biSiE6ih0/img.png" data-phocus="https://blog.kakaocdn.net/dn/vq9bV/dJMcaivTvjF/NuvxkvDkYeVJ7biSiE6ih0/img.png"><img src="https://blog.kakaocdn.net/dn/vq9bV/dJMcaivTvjF/NuvxkvDkYeVJ7biSiE6ih0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fvq9bV%2FdJMcaivTvjF%2FNuvxkvDkYeVJ7biSiE6ih0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1094" height="542" data-origin-width="1094" data-origin-height="542"/></span></figure>
</p>
<p data-ke-size="size16">이와 같은 방식은 피싱 등에 이용될 수 있습니다.</p>
<ol style="list-style-type: decimal;" data-ke-list-type="decimal">
<li>웹훅 납치</li>
</ol>
<pre class="apache"><code>https://auth-prod.hspace.io/v1/auth?provider=google&amp;redirect_back_to=https%3A%2F%2Fforge.hspace.io%2Fcb%3Fredirect%3Dhttps%3A%2F%2Fwebhook.site%2F[YOUR_ID]</code></pre>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-filename="blob" data-origin-width="1111" data-origin-height="584"><span data-url="https://blog.kakaocdn.net/dn/dgqTjk/dJMcadVD5vC/7PGfUactzwk484UKzsktZk/img.png" data-phocus="https://blog.kakaocdn.net/dn/dgqTjk/dJMcadVD5vC/7PGfUactzwk484UKzsktZk/img.png"><img src="https://blog.kakaocdn.net/dn/dgqTjk/dJMcadVD5vC/7PGfUactzwk484UKzsktZk/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdgqTjk%2FdJMcadVD5vC%2F7PGfUactzwk484UKzsktZk%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1111" height="584" data-filename="blob" data-origin-width="1111" data-origin-height="584"/></span></figure>
</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">추가로 아래는 리다이렉트 직전의 URL입니다. (307)</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-filename="blob" data-origin-width="1150" data-origin-height="730"><span data-url="https://blog.kakaocdn.net/dn/otJup/dJMcahjwgZR/aDhKyrwT0vgQDZ3uDgkgPk/img.png" data-phocus="https://blog.kakaocdn.net/dn/otJup/dJMcahjwgZR/aDhKyrwT0vgQDZ3uDgkgPk/img.png"><img src="https://blog.kakaocdn.net/dn/otJup/dJMcahjwgZR/aDhKyrwT0vgQDZ3uDgkgPk/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FotJup%2FdJMcahjwgZR%2FaDhKyrwT0vgQDZ3uDgkgPk%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1150" height="730" data-filename="blob" data-origin-width="1150" data-origin-height="730"/></span></figure>
</p>
<p data-ke-size="size16">여기서 code는 변수명이 아니라 OAuth 2.0 표준 명칭(Authorization Code)입니다. -Authorization Code Grant-<br />상태 코드 <b>307</b>은 서버가 인증을 성공적으로 처리하고 다음 단계로 진행 중임을 의미하므로, URL에 포함된 code 값은 실제 계정 접근 권한을 가진 유효한 Authorization Code임을 기술적으로 증명합니다.</p>
