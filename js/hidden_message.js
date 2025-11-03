// 🦎 hero 영역 요소 가져오기
const photo = document.querySelector('.intro-photo');
const heroText = document.querySelector('.intro-text');
const originalHTML = heroText.innerHTML;

// 도마뱀 hover 시 hero 텍스트 교체
photo.addEventListener('mouseenter', () => {
  heroText.innerHTML = `
    <h1>Gecko Heodung 🦎</h1>
    <p>Greatest Of All Time</p>
    <p>
      Adopted on <strong>June 29, 2024</strong>.<br>
      A <strong>male White Lily gecko</strong> with a refined taste for 
      <em>fig superfoods</em>.<br>
      Calm by day, a curious explorer by night.<br><br>

      <em>Prefers sleeping upside down — because gravity is optional.</em><br>
      <em>Has mastered the art of staring into nothing for hours.</em><br>
      <em>Enjoys climbing anything taller than himself.</em><br><br>
      <em><strong>Escape record:</strong> 2 successful breakouts (and counting).</em>
      </p>
  `;
});
// 마우스 나가면 원래대로 복구
photo.addEventListener('mouseleave', () => {
  heroText.innerHTML = originalHTML;
});
