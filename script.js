document.addEventListener("DOMContentLoaded", function() {
    console.log("Interactive CV loaded!");

    const fatherOfHeodung = document.querySelector('.father-of-heodung');
    const heodungImage = document.querySelector('.heodung-image');

    fatherOfHeodung.addEventListener('mouseover', function() {
        heodungImage.style.display = 'block'; // 마우스 오버 시 이미지 표시
    });

    fatherOfHeodung.addEventListener('mouseout', function() {
        heodungImage.style.display = 'none'; // 마우스 아웃 시 이미지 숨김
    });
});
