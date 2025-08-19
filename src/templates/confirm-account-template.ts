export const CONFIRM_ACCOUNT_TEMPLATE = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmação de Conta</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4a90e2;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 30px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
        }
        .code {
            display: inline-block;
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            padding: 10px 20px;
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 20px 0;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4a90e2;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #357abd;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .footer a {
            color: #4a90e2;
            text-decoration: none;
        }
        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            .content {
                padding: 20px;
            }
            .header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Bem-vindo à sua conta!</h1>
        </div>
        <div class="content">
            <p>Olá, {name} {surname}</p>
            <p>Estamos felizes por você fazer parte da nossa comunidade! Para ativar sua conta, utilize o código de confirmação abaixo:</p>
            <div class="code">{confirmCode}</div>
            <p>Insira este código na página de ativação para confirmar sua conta.</p>
            <a href="#" class="button">Ativar Conta</a>
        </div>
        <div class="footer">
            <p>Se você não criou uma conta, ignore este e-mail. Para suporte, <a href="mailto:suporte@exemplo.com">entre em contato</a>.</p>
            <p>&copy; 2025 Sua Empresa. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>`