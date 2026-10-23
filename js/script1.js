const plusCart = document.getElementById('plusCart');
const plusBtn = document.getElementById('plusBtn');

// أضفنا الكائن (e) هنا لمنع انتشار الحدث
plusBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // 👈 منع الضغطة من الانتقال إلى الـ document
    plusCart.style.display = 'block';
    plusBtn.style.display = 'none';
});

document.addEventListener('click', (e) => {
    if (plusCart.style.display === 'block') {
        // الآن يمكنك فحص خارج البطاقة بأمان تام
        if (!plusCart.contains(e.target)) {
            plusCart.style.display = 'none'; // إخفاء البطاقة
            plusBtn.style.display = 'block';  // إظهار زر الفتح مجدداً
        }
    }
});
