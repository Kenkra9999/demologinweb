const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPassword = document.getElementById('loginPassword');

toggleLoginPassword.addEventListener('click', () => {
    // Nếu đang ẩn thì chuyển sang hiện
    if (loginPassword.type === 'password') {
        loginPassword.type = 'text';
        // đổi icon sang con mắt (hiện)
        toggleLoginPassword.classList.remove('fa-eye-slash');
        toggleLoginPassword.classList.add('fa-eye');
    } else {
        // nếu đang hiện thì chuyển sang ẩn
        loginPassword.type = 'password';
        // đổi icon sang gạch chéo (ẩn)
        toggleLoginPassword.classList.remove('fa-eye');
        toggleLoginPassword.classList.add('fa-eye-slash');
    }
});


/* ==================== SIGN-UP VALIDATION ====================
   ĐOẠN CŨ (legacy) ĐƯỢC BỌC VÀO HÀM legacySignup() — KHÔNG GỌI HÀM
   ==> Giữ nguyên text nhưng tránh khai báo trùng/ runtime error.
*/
function legacySignup() {
    const signupForm = document.querySelector('.sign-up form');
    const pwdInput = document.getElementById('signupPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const pwdError = document.getElementById('pwdError');
    const confirmError = document.getElementById('confirmError');
    const successMsg = document.getElementById('signupSuccess');

    function clearSignupErrors() {
        pwdError.textContent = '';
        confirmError.textContent = '';
        successMsg.textContent = '';
        pwdInput.style.border = confirmInput.style.border = '';
    }

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearSignupErrors();
        let err = false;

        // 1. Mật khẩu >= 6 ký tự
        if (pwdInput.value.length < 6) {
            pwdError.textContent = 'Mật khẩu phải ít nhất 6 ký tự';
            pwdInput.style.border = '1px solid #e74c3c';
            err = true;
        }

        // 2. Confirm phải khớp
        if (pwdInput.value !== confirmInput.value) {
            confirmError.textContent = 'Mật khẩu xác nhận không khớp';
            confirmInput.style.border = '1px solid #e74c3c';
            err = true;
        }

        // 3. Email hợp lệ (đơn giản)
        const email = document.querySelector('.sign-up input[type="email"]').value;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Vui lòng nhập email hợp lệ');
            err = true;
        }

        if (err) return;

        // Thành công → hiện thông báo + chuyển tab sau 1s
        successMsg.textContent = 'Tạo tài khoản thành công!';
        setTimeout(() => {
            container.classList.remove('active');   // chuyển về Sign In
            successMsg.textContent = '';
            signupForm.reset();
        }, 1000);
    });
}
// legacySignup();
// ---- end legacy block ----


const forgetLink = document.querySelector('.sign-in a');
forgetLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginPassword.type = 'text';
    toggleLoginPassword.classList.remove('fa-eye-slash');
    toggleLoginPassword.classList.add('fa-eye');
});

// =============================
// 🔹 VALIDATE CREATE ACCOUNT
// =============================

const signUpForm = document.querySelector('.sign-up form');
const emailInput = signUpForm.querySelector('input[type="email"]');
const passwordInput = signUpForm.querySelectorAll('input[type="password"]')[0];
const confirmInput = signUpForm.querySelectorAll('input[type="password"]')[1];

// Thêm 1 thẻ p để hiển thị thông báo
const message = document.createElement('p');
message.style.marginTop = '10px';
signUpForm.appendChild(message);

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault(); // chặn reload

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;

    // Kiểm tra email
    if (email === '' || !email.includes('@') || !email.includes('.')) {
        message.textContent = 'Please enter a valid email.';
        message.style.color = 'red';
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
        message.textContent = 'Password must be at least 6 characters.';
        message.style.color = 'red';
        return;
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirm) {
        message.textContent = 'Passwords do not match.';
        message.style.color = 'red';
        return;
    }

    // Nếu hợp lệ
    message.textContent = 'Account created successfully!';
    message.style.color = 'green';

    // Lưu tài khoản tạm thời
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);

    // 1 giây sau chuyển sang tab Sign In
    setTimeout(() => {
        container.classList.remove('active');
        message.textContent = '';
        signUpForm.reset();
    }, 1000);
});

// =============================
// 🔹 VALIDATE SIGN IN
// =============================

const signInForm = document.querySelector('.sign-in form');
const signInEmail = signInForm.querySelector('input[type="email"]');
const signInPassword = signInForm.querySelector('#loginPassword');

// Thêm thẻ p để hiện thông báo đăng nhập
const signInMsg = document.createElement('p');
signInMsg.style.marginTop = '10px';
signInForm.appendChild(signInMsg);

signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (signInEmail.value === storedEmail && signInPassword.value === storedPassword) {
        signInMsg.textContent = 'Login successful!';
        signInMsg.style.color = 'green';
    } else {
        signInMsg.textContent = 'Invalid email or password.';
        signInMsg.style.color = 'red';
    }
});
