@echo off
echo Iniciando Odonto_FBBR...
echo.

REM Verifica se o arquivo HTML principal existe
if not exist "%~dp0\index.html" (
    echo Erro: Arquivo index.html não encontrado!
    echo Certifique-se de que todos os arquivos estão presentes no pendrive.
    pause
    exit /b 1
)

REM Inicia o navegador padrão com o arquivo index.html
start "" "%~dp0\index.html"

echo Odonto_FBBR iniciado com sucesso!
echo Você pode fechar esta janela.
timeout /t 3 >nul
exit
