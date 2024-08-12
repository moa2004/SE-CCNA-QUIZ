function submitQuiz(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log("Submitting quiz..."); // Debugging line

    const correctAnswers = {
        q1: 'b',
        q2: 'c',
        q3: 'c',
        q4: 'a',
        q5: 'b',
        q6: 'd',
        q7: 'b',
        q8: 'c',
        q9: 'd',
        q10: 'd',
        q11: 'c',
        q12: 'a',
        q13: 'b',
        q14: 'a',
        q15: 'c',
    };

    let score = 0;
    let userAnswers = {};
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);

    for (let [key, value] of formData.entries()) {
        userAnswers[key] = value;
        if (value === correctAnswers[key]) {
            score++;
        }
    }

    const userName = document.getElementById('user-name').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `Thank you ${userName}, your score is ${score}/15`;

    // Append the score to the form data
    formData.append("score", score);
    formData.append("user_answers", JSON.stringify(userAnswers));

    // Submit the form using Formspree
    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            resultDiv.innerHTML += "<br>Quiz results have been sent to your email!";
        } else {
            resultDiv.innerHTML += "<br>There was an issue submitting the quiz. Please try again.";
            console.error("Form submission error:", response); // Debugging line
        }
    }).catch(error => {
        resultDiv.innerHTML += "<br>There was an issue submitting the quiz. Please try again.";
        console.error("Fetch error:", error); // Debugging line
    });
}
