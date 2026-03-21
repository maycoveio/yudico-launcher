const loginOptionsCancelContainer = document.getElementById('loginOptionCancelContainer')
const loginOptionMicrosoft = document.getElementById('loginOptionMicrosoft')
const loginOptionOffline = document.getElementById('loginOptionOffline') 
const offlineNickname = document.getElementById('offlineNickname') 
const loginOptionsCancelButton = document.getElementById('loginOptionCancelButton')

// Lógica para o botão JOGAR AGORA (Modo Pirata/Offline)
loginOptionOffline.onclick = (e) => {
    const nick = offlineNickname.value.trim()
    
    if(nick.length < 3){
        alert('O Nick deve ter pelo menos 3 caracteres!')
        return
    }

    loginOptionOffline.disabled = true
    const originalContent = loginOptionOffline.innerHTML
    loginOptionOffline.innerHTML = '<span>CARREGANDO...</span>'

    // Chama a função que criamos no AuthManager
    AuthManager.addOfflineAccount(nick).then((value) => {
        // Redireciona para a Landing (Tela principal)
        if (typeof loginOptionsViewOnLoginSuccess === 'function') {
            loginOptionsViewOnLoginSuccess(value)
        } else {
            switchView(getCurrentView(), VIEWS.landing)
        }
    }).catch((displayableError) => {
        loginOptionOffline.disabled = false
        loginOptionOffline.innerHTML = originalContent
        console.error('Erro no Login:', displayableError)
        alert('Erro ao entrar: ' + (displayableError.desc || 'Tente novamente.'))
    })
}

// Mantém o botão da Microsoft funcionando
loginOptionMicrosoft.onclick = (e) => {
    switchView(getCurrentView(), VIEWS.waiting, 500, 500, () => {
        ipcRenderer.send(
            MSFT_OPCODE.OPEN_LOGIN,
            loginOptionsViewOnLoginSuccess,
            loginOptionsViewOnLoginCancel
        )
    })
}

// Botão Cancelar (Voltar)
loginOptionsCancelButton.onclick = (e) => {
    switchView(getCurrentView(), loginOptionsViewOnCancel, 500, 500, () => {
        if(offlineNickname) offlineNickname.value = ''
        if(loginOptionsViewCancelHandler != null){
            loginOptionsViewCancelHandler()
            loginOptionsViewCancelHandler = null
        }
    })
}

function loginOptionsCancelEnabled(val){
    if(val){
        $(loginOptionsCancelContainer).show()
    } else {
        $(loginOptionsCancelContainer).hide()
    }
}