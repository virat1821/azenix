<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "yourgmail@gmail.com";  // Replace with your Gmail address
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    if (empty($name) || empty($subject) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
        // invalid submission, you can redirect or show error
        echo "Please fill in all required fields properly.";
        exit;
    }

    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    $email_headers = "From: $name <$email>";

    if (mail($to, $subject, $email_content, $email_headers)) {
        // Redirect to thank you page after success
        header("Location: thanku.html");
        exit;
    } else {
        echo "Oops! Something went wrong, we couldn't send your message.";
    }
} else {
    // Not a POST request
    echo "Invalid request.";
}
?>
