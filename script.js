function calculate(machineNumber) {
    var machinery = document.getElementById('machinery' + machineNumber).value;
    var length = document.getElementById('length' + machineNumber).value;
    var shift = document.getElementById('shift' + machineNumber).value;
    var productionTime;
    var calculation = '';
    var setupTime, startupTime, productionRate;

    // Calcola il tempo di produzione in base al macchinario, alla lunghezza e al turno di lavoro
    if (machinery === 'macchina1') {
        setupTime = 60; // 1 ora per l'allestimento
        startupTime = 10; // 10 minuti per l'avviamento
        productionRate = 1.8; // 1,8 metri al minuto
    } else if (machinery === 'macchina2') {
        setupTime = 20; // 20 minuti per l'allestimento
        startupTime = 2; // 2 minuti per l'avviamento
        productionRate = 10; // 10 metri al minuto
    }

    productionTime = setupTime + startupTime + (length / productionRate);
    calculation = 'Tempo di allestimento: ' + setupTime + ' minuti, ' + 'Tempo di avviamento: ' + startupTime + ' minuti, ' + 'Tempo di produzione: ' + (length / productionRate).toFixed(2) + ' minuti';

    // Calcola la data e l'ora di inizio del lavoro in base al turno di lavoro
    var startTime = new Date();
    var endTime = new Date();
    if (shift === 'giornaliero') {
        startTime.setHours(8, 0, 0, 0); // Inizia alle 8:00
        endTime.setHours(18, 0, 0, 0); // Finisce alle 18:00
    } else if (shift === 'doppio') {
        startTime.setHours(6, 0, 0, 0); // Inizia alle 6:00
        endTime.setHours(22, 0, 0, 0); // Finisce alle 22:00
    }

    // Calcola la data e l'ora di fine del lavoro
    var endDate = new Date(); //Ottengo la data e l'ora attuali
    endDate.setHours(endDate.getHours() + productionTime); //Aggiungi il tempo di produzione
    var finishTime = new Date(startTime.getTime() + productionTime * 60 * 1000);

    // Se l'ora di fine è dopo l'ora di chiusura, calcola il tempo di inattività e aggiungi il tempo di avviamento del giorno successivo
    if (finishTime > endTime) {
        var downtime = (startTime.getTime() + 24 * 60 * 60 * 1000) - endTime.getTime();
        finishTime = new Date(finishTime.getTime() + downtime + startupTime * 60 * 1000);
        calculation += ', Poi si aggiungono ' + (downtime / 60 / 1000).toFixed(2) + ' minuti di inattività e ' + startupTime + ' minuti di avviamento il giorno successivo';
    }

    // Salva la data e l'ora di fine del lavoro nel localStorage
    localStorage.setItem('endTime' + machineNumber, finishTime);

    // Mostra la data e l'ora di fine del lavoro
    document.getElementById('result' + machineNumber).textContent = 'La macchina ' + machineNumber + ' finirà il lavoro alle ' + finishTime.toLocaleTimeString('it-IT');
    document.getElementById('calculation' + machineNumber).textContent = 'Calcolo: ' + calculation;
    }   

    function mostraDataFineAggiornamento() {
        var dataFineAggiornamento = calcolaDataFineAggiornamento();
        var risultatoDiv = document.getElementById('result');
        risultatoDiv.textContent = 'La macchina' + machineNumber + ' finirà il giorno ' + dataFineAggiornamento.toLocaleDateString() + ' alle ore ' + dataFineAggiornamento.toLocaleTimeString();
    }





    function toggleMachine2() {
        var machine2 = document.getElementById('machine2');
        var addMachineButton = document.getElementById('addMachine');
        if (machine2.style.display === 'none') {
            machine2.style.display = 'block';
            addMachineButton.textContent = 'Rimuovi timer per seconda macchina';
        } else {
            machine2.style.display = 'none';
            addMachineButton.textContent = 'Aggiungi il timer a un\'altra macchina';
        }
    

    // Quando la pagina viene caricata, controlla se esiste una data e un'ora di fine del lavoro nel localStorage
    window.onload = function() {
        for (var i = 1; i <= 2; i++) {
            var endTime = localStorage.getItem('endTime' + i);
            if (endTime) {
                document.getElementById('result' + i).textContent = 'La macchina ' + i + ' finirà il lavoro alle ' + new Date(endTime).toLocaleTimeString('it-IT');
            }
        }
    };
}
