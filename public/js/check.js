document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = document.querySelector("input[name='title']").value;
        const description = document.querySelector("textarea[name='description']").value;
        const result = document.querySelector(".result");

        if (!title || !description) {
            result.classList.add('error');
            result.innerHTML = 'Por favor preencha os campos';
        } else {
            result.classList.remove('error');
            result.classList.add('ok');
            result.innerHTML = 'enviado!';
            form.submit();
        }
    });
});
