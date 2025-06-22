// netlify/functions/proxy-map.js

export async function handler(event, context) {
  // 1) private GitHub raw URL
  const url =
    'https://raw.githubusercontent.com/Ditpy/ultraseoul2025/main/ultraseoul2025_map_50k.html';

  // 2) GitHub 토큰을 HTTP 헤더에 실어 요청
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  });

  // 3) 실패 처리
  if (!res.ok) {
    return {
      statusCode: res.status,
      body: res.statusText
    };
  }

  // 4) 성공 시 HTML 그대로 스트리밍
  const html = await res.text();
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: html
  };
}
