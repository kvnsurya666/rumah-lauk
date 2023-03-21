<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $message = $data['message'];

    $to = 'rumahlaukfp9@example.com';
    $subject = 'New message from your website';
    $message_body = "Name: $name\nEmail: $email\nPhone: $phone\n\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message_body, $headers)) {
        $response = ['status' => 'success', 'message' => 'Your message has been sent.'];
    } else {
        $response = ['status' => 'error', 'message' => 'An error occurred while sending the message.'];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}
