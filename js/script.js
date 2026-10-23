const clearBtn = document.getElementById('clearBtn');
const okBtn = document.getElementById('okBtn');
const textInput = document.getElementById('textInput');
const ul = document.getElementById('ul');
const deleteBtn = document.getElementById('deleteBtn'); 

let indexColor = 0;
const pastelColors = [
  { name: "Pastel Pink", hex: "#FFB7B2" },     
  { name: "Pastel Peach", hex: "#FFDAC1" },    
  { name: "Pastel Yellow", hex: "#E2F0CB" },   
  { name: "Pastel Green", hex: "#B5EAD7" },    
  { name: "Pastel Blue", hex: "#C7CEEA" },     
  { name: "Pastel Lavender", hex: "#E8AEFF" }, 
  { name: "Pastel Mint", hex: "#95E1D3" },     
  { name: "Pastel Rose", hex: "#F38181" }      
];

textInput.addEventListener('input', (e) => {
    if (e.target.value.trim() !== '') {
        clearBtn.style.display = 'block'; 
    } else {
        clearBtn.style.display = 'none';  
    }
});

textInput.addEventListener('invalid', () => {
    clearBtn.style.display = 'none';
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    clearBtn.style.display = 'none';
});

okBtn.addEventListener('click', () => {
    if (textInput.value.trim() !== '') {
        
        ul.insertAdjacentHTML('beforeend', `<li class="li">${textInput.value} <input class="clearCheckbox" type="checkbox" style="display:none;"></li>`);
        
        const currentLiElements = document.querySelectorAll('li');
        const lastLi = currentLiElements[currentLiElements.length - 1];
        
        lastLi.style.backgroundColor = pastelColors[indexColor % pastelColors.length].hex;
        
        indexColor++;
        textInput.value = ''; 
        clearBtn.style.display = 'none'; 
    }
});

ul.addEventListener('click', (e) => {
    if (e.target.classList.contains('li')) {
        if (e.target.style.textDecoration === 'line-through') {
            e.target.style.textDecoration = 'none'; 
        } else {
            e.target.style.textDecoration = 'line-through'; 
        }
    }
});

// تفعيل منظومة الحذف الذكية ثنائية المراحل
if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        // 1. جلب العناصر المحددة (مضغوط عليها) حالاً في هذه اللحظة
        const selectedCheckboxes = document.querySelectorAll('.clearCheckbox:checked');
        
        // 2. إذا وجد الكود عناصر مختارة، يقوم بحذفها فوراً وينتهي العمل هنا
        if (selectedCheckboxes.length > 0) {
            selectedCheckboxes.forEach((checkbox) => {
                checkbox.parentElement.remove(); 
            });
            console.log(`تم حذف ${selectedCheckboxes.length} من العناصر بنجاح.`);
            
            // إخفاء المربعات المتبقية بعد اكتمال عملية الحذف
            document.querySelectorAll('.clearCheckbox').forEach(cb => cb.style.display = 'none');
            return; // التوقف لعدم تنفيذ كود الإظهار بالأسفل
        }

        // 3. إذا لم يجد عناصر مختارة (أي هذه هي الضغطة الأولى لإظهار الخيارات)
        const allCheckboxes = document.querySelectorAll('.clearCheckbox');
        
        if (allCheckboxes.length === 0) {
            console.log("القائمة فارغة تماماً، لا توجد عناصر لإظهار مربعاتها.");
            return;
        }

        // فحص حالة المربع الأول لمعرفة هل هي ظاهرة أم مخفية حالياً لعمل Toggle
        const isHidden = allCheckboxes[0].style.display === 'none';

        allCheckboxes.forEach((checkbox) => {
            checkbox.style.display = isHidden ? 'inline-block' : 'none';
        });
    });
}
