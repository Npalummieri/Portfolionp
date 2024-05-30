    document.querySelectorAll('a[href^=""]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    //Paginacion icons

    //Timer
    const intervalTime = 5000; // Tiempo en milisegundos (5 segundos)
    let intervalId;

    // Función para avanzar automáticamente a la siguiente página
    function autoAdvance() {
        if (currentPage < groupItems.length - 1) {
            currentPage++;
        } else {
            currentPage = 0;
        }
        showPage(currentPage);
    }

    // Función para iniciar el intervalo
    function startInterval() {
        clearInterval(intervalId); //limpiar cualquier intervalo existente
        intervalId = setInterval(autoAdvance, intervalTime);
    }


    const currentList = document.querySelectorAll('.box-icon').length;


    //Manejo itemList
    let itemsList = document.querySelectorAll('.itemList');
    const groupItems = [];
    for (let j = 0; j < itemsList.length; j += 4) {
        groupItems.push(Array.from(itemsList).slice(j, j + 4));
    }
    // Obtener los elementos de box-icon
    const boxIcons = document.querySelectorAll('.box-icon');
    // Dividir los elementos en grupos de 4
    const iconGroups = [];
    for (let i = 0; i < boxIcons.length; i += 4) {
        iconGroups.push(Array.from(boxIcons).slice(i, i + 4));
    }
    let currentPage = 0;


    // Función para mostrar los elementos de la página actual
    function showPage(pageIndex) {
        // Quitamos la propiedad active (que los muestra)
        itemsList.forEach(icon => icon.classList.remove('active'));

        itemsList.forEach(item => {
            let boxIconItem = item.querySelector('.box-icon');
            let card = item.querySelector('.card');
            let art = item.querySelector('[id*="Art"]');
            if (window.matchMedia("(min-width: 601px)").matches) {
            boxIconItem.addEventListener('mouseenter', function () {
                clearInterval(intervalId); // Detener el temporizador al hacer enter/fakehover
                boxIconItem.style.display = "none"
                card.style.display = "flex";
                card.style.background = "var(--card-color)";
                card.style.color = "var(--font-color)";
                card.style.animation = "doaflip"
                card.style.animationDuration = "1s"; // Duración de cada animación
                card.style.animationIterationCount = ""; // Cantidad de repeticiones
                card.style.margin = "10px";
                art.style.display = "flex";
                art.style.justifyContent = "center";
                art.style.alignItems = "center";
                

            });
        
            card.addEventListener('mouseleave', function () {
                card.style.display = "none";
                boxIconItem.style.display = "flex"
                startInterval(); // Reiniciar el temporizador al salir del hover
            });
        }
        })
        // Ocultar todos los elementos de box-icon
        itemsList.forEach(icon => icon.style.opacity = '0'); // Configura la opacidad a 0
        setTimeout(() => {
            // Mostrar los elementos de la página actual con transición de fade
            groupItems[pageIndex].forEach(icon => {
                icon.style.opacity = '1'; // Configura la opacidad a 1
            });
            //La agregamos
            groupItems[pageIndex].forEach(icon => icon.classList.add('active'));
        }, 100); // Espera 50 milisegundos antes de mostrar los elementos con opacidad 1



    }

    // Mostrar la primera página al cargar la página
    
    showPage(currentPage);
    startInterval();


    // Manejar clics en los botones de paginación
    const containerSection = document.querySelector("#resourcesSection");
    const cards = document.querySelectorAll(".card");
    const prevButton = document.querySelector('#arrow-left');
    const nextButton = document.querySelector('#arrow-right');



    prevButton.addEventListener('click', function () {
        clearInterval(intervalId);
        buttonEffect(prevButton.parentElement);
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
        } else {
            currentPage = groupItems.length-1;
            showPage(currentPage);
            startInterval();
        }
    });

    nextButton.addEventListener('click', function () {
        clearInterval(intervalId); // Detener el temporizador al hacer clic
        buttonEffect(nextButton.parentElement); //Referencio al padre xq sino no referencias al contenedor
        if (currentPage < groupItems.length - 1) {
            currentPage++;
            showPage(currentPage);
        } else {
            currentPage = 0;
            showPage(currentPage);
            startInterval(); // Reiniciar el temporizador después de hacer clic
        }
    });


function buttonEffect(btn)
{
    btn.addEventListener('mousedown', () => {
        btn.classList.add('activen');
    });

    btn.addEventListener('mouseup', () => {
        setTimeout(() => {
            btn.classList.remove('activen');
        }, 50); // Tiempo para mantener el efecto antes de revertirlo
    });
}


    // ///Scroll suavizado a cada seccion
    // document.addEventListener("DOMContentLoaded", function() {
    //     const links = document.querySelectorAll('a[href^="#"]');

    //     links.forEach(link => {
    //         link.addEventListener("click", function(e) {
    //             e.preventDefault();

    //             const targetId = this.getAttribute("href").substring(1); //No confundir con extraer el primer caracter del string,lo que buscas es el substring 'nombreHref' en vez de '#nombreHref'
    //             console.log(targetId);
    //             const targetElement = document.getElementById(targetId);

    //             if (targetElement) {
    //                 // Obtener la posición vertical del elemento de destino
    //                 const targetOffset = targetElement.offsetTop;
    //                 console.log(targetOffset);
    //                 // Desplazarse suavemente a la posición del elemento de destino
    //                 window.scrollTo({
    //                     top: targetOffset,
    //                     behavior: 'smooth' // Esto activa el desplazamiento suave
    //                 });
    //             }
    //         });
    //     });
    // });

    // Z-index dinamico
    let foldersInv = document.querySelectorAll('.folder.invert');
    let folderTags = document.querySelectorAll('.foldertag.invert');
    let sizeFoldersInv = foldersInv.length;
    let j = 0;

    for (let i = sizeFoldersInv - 1; i >= 0; i--) {
        foldersInv[j].style.zIndex = i;
        folderTags[j].style.zIndex = i;
        j++;
    }
    j = 0;

    // let zindexFath = window.getComputedStyle(padre).getPropertyValue('z-index');



    //Sirvió en su momento pero para la funcionalidad de los modals que necesito es mejor todo en una misma func
    // //Close modal button
    // let btnsClose = document.querySelectorAll('.closebtn.modalcls');
    // btnsClose.forEach(closebtn => {
    //     closebtn.addEventListener('click', function (event) {
    //         event.stopPropagation(); // Detiene la propagación del evento
    //         let modals = document.querySelectorAll('.modal');
    //         let lastModal = modals[modals.length - 1]; // Seleccionamos el último modal de la lista
    //         console.log("MODALS "+modals);
    //         lastModal.remove(); // Eliminamos el último modal

    //     });

    // });


    let timeoutID;

            function loadSumm(index = 0) {
                let mySummary = document.getElementById('mySum');
                let textMySumm = mySummary.textContent;
                const charSpan = document.getElementById('charSpan');
                charSpan.style.hyphens = "auto";
                    if (window.matchMedia("(max-width: 600px)").matches) {
                        charSpan.style.fontSize = "1em";
                    } else {
                        charSpan.style.fontSize = "2em";
                    }

                if (index === 0) {
                    charSpan.innerHTML = ""; // Reset charSpan content
                }

                if (index < textMySumm.length) {
                    charSpan.innerHTML += (textMySumm[index] === ' ') ? ' ' : textMySumm[index];
                    timeoutID = setTimeout(() => loadSumm(index + 1), 1);
                }
                charSpan.style.display = "block";
            }

            function startAnimation() {
                clearTimeout(timeoutID);
                loadSumm();
            }

    window.addEventListener('load', startAnimation);

    // Handle mouse enter and leave events
    const summSec = document.getElementById('summarySection');
    summSec.addEventListener('mouseenter', startAnimation);

    const mySumm = document.getElementById('mySum');
    mySumm.addEventListener('mouseleave', startAnimation);



    /*||||||||||||||||||||||||||||||||||||||||||||||  MODAL  |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| */
    //Display & close modal
    document.addEventListener("DOMContentLoaded", function () {
        selectfont("windowsreg");
        // Tu código aquí se ejecutará una vez que se haya cargado el documento
        let dispModal = document.querySelectorAll('.folder');
        dispModal.forEach(modalClicked => {
            modalClicked.addEventListener('click', function (e) {
                let modalToDisp = modalClicked.querySelector('.modal');


                selectModalsFromFolderClicked(modalClicked);

            })
        })
    });


    function selectModalsFromFolderClicked(modalClicked) {
        let clonedDiv = document.getElementById('cloned');
        let clonedDivModals = clonedDiv.querySelectorAll('.modal');
        if (clonedDivModals.length > 1) {
            clonedDivModals[0].remove();
        }
        let allModals = modalClicked.querySelectorAll('.modal');
        const arrayAllModals = Array.from(allModals);
        dispAndCloseModal(allModals);
    }

    function dispAndCloseModal(allModals) {
        let curPage = 0;

        // Maneja el clic en el botón "Anterior"
        function showCurrentModal() {
            // Oculta todos los modals            
            allModals.forEach(modal => modal.style.display = 'none');
            // Muestra el modal de la página actual
            let modalSelected = allModals[curPage].cloneNode(true);
            document.querySelector('#cloned').appendChild(modalSelected);
            modalSelected.style.display = "flex";

            document.body.style.overflow = "hidden"; // Deshabilitar el scroll del cuerpo

            //Botones de cada modal
            let closeBtn = modalSelected.querySelector('.close-button');
            let minBtn = modalSelected.querySelector('.minimize-button');
            let maxbtn = modalSelected.querySelector('.maximize-button');
            let modalMain = maxbtn.closest('.modal');
            let modalToMax = maxbtn.closest('.modal-content');
            let windowDiv = maxbtn.closest('.window');

            let maxxed = 0;
            let originalStyles = {};
            maxbtn.addEventListener('click', function () {
                if (maxxed === 0) {
                    // Guardar estilos originales solo si no están guardados
                    if (!originalStyles.width) {
                        originalStyles = {
                            width: windowDiv.style.width,
                            height: windowDiv.style.height,
                            margin: windowDiv.style.margin,
                            displayModal: modalToMax.style.display,
                            marginModal: modalToMax.style.margin,
                            widthModal: modalToMax.style.width,
                            heightModal: modalToMax.style.height
                        };
                    }
                }


                let divIcon = maxbtn.querySelector('.maxfig');
                if (maxxed === 0) {
                    divIcon.style.borderTop = "3px solid black";
                    divIcon.style.borderBottom = "1px solid black";
                    divIcon.style.borderRight = "1px solid black";
                    divIcon.style.borderLeft = "1px solid black";

                    modalMain.style.display = "block";
                    modalMain.style.width = "100%";
                    modalMain.style.height = "100%";

                    windowDiv.style.display = "block";
                    windowDiv.style.height = "100%"
                    windowDiv.style.margin = "0 auto";

                    modalToMax.style.display = "block";
                    modalToMax.style.margin = "auto 0";
                    modalToMax.style.width = "100%";
                    modalToMax.style.height = "100%";
                    maxxed = 1;
                } else {
                    divIcon.style.border = "2px solid black";
                    

                    windowDiv.style.height = originalStyles.height;
                    windowDiv.style.margin = originalStyles.margin;

                    modalToMax.style.display = originalStyles.displayModal;
                    modalToMax.style.margin = originalStyles.marginModal;
                    modalToMax.style.width = originalStyles.widthModal;
                    modalToMax.style.height = originalStyles.heightModal;
                    maxxed = 0;
                }
            });
            closeBtn.addEventListener('click', function () {
                lastNode.remove();
                curPage = 0;
                document.body.style.overflow = "auto";
            });
            minBtn.addEventListener('click', function () {
                lastNode.remove();
                curPage = 0;
                document.body.style.overflow = "auto";
            });


            return modalSelected;
        }

        //Mostrar modal al click
        let lastNode = showCurrentModal();


        /////////////////////////////////// Slides carousel
        let slideIndex = 0;
        let slides = lastNode.querySelectorAll(".slide");
        let commentSlides = lastNode.querySelectorAll('.commentSlide');

        function showSlides() {


            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                //Hay un problema de logica y es que asumimos que todos las slides tienen comentarios,y va a haber una mala conexion entre slide-comentario si no se tiene en cuenta eso
                if (i < commentSlides.length) {
                    commentSlides[i].style.display = "none";
                }
            }
            // slides[slideIndex].style.display = "flex";
            slides[slideIndex].style.display = "flex";
            // slides[slideIndex].style.width = "100%";
            // slides[slideIndex].style.height = "50%";
            slides[slideIndex].style.justifyContent = "center"
            slides[slideIndex].style.alignItems = "center"
            // commentSlides[slideIndex].style.display ="block";
            let idsComm = [];
            commentSlides.forEach(comm => {
                idsComm.push(parseInt(comm.getAttribute('data-idcommSlide')));
            });
            if (idsComm.indexOf(slideIndex) != -1) {
                commentSlides[idsComm.indexOf(slideIndex)].style.display = "block";
            }

            // idsSlideComm.forEach(commId => {

            // });
            //

        }

        showSlides(); // Muestra el primer slide al cargar el modal



        lastNode.querySelector('.prev').addEventListener('click', function () {
            slideIndex--;
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            showSlides();
        })



        lastNode.querySelector('.next').addEventListener('click', function () {
            buttonEffect(lastNode.querySelector('.next'));
            slideIndex++;
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            showSlides();
        })


        //         lastNode.querySelector('#prevModalBtn').addEventListener('click', () => {
        //             console.log("curpage");
        //     console.log(curPage);
        //     curPage = (curPage - 1 + allModals.length) % allModals.length;
        //     if(curPage == 0)
        //         {
        //             curPage = allModals.length-1;
        //         }
        //     console.log("curpage");
        //     console.log(curPage);
        //     lastNode.remove();
        //     lastNode = showCurrentModal();
        // });

        // Maneja el clic en el botón "Siguiente"
        // lastNode.querySelector('#nextModalBtn').addEventListener('click', () => {
        //     console.log("curpage");
        //     console.log(curPage);
        //     if(curPage > allModals.length)
        //         {
        //             curPage = 0;
        //         }
        //     curPage = (curPage + 1) % allModals.length;
        //     console.log("curpage");
        //     console.log(curPage);
        //     lastNode.remove();
        //     lastNode = showCurrentModal();
        // });







        //let modalClone = modalToDisp.cloneNode(true);  Clonamos el modal para que sea un nodo y a su vez no interferir con el original moviendolo de acá para allá

        // document.body.appendChild(modalClone);
        // modalClone.style.display = "block";

    }

    //Evitar comportamiento modal especificamente en el note
    //Obtener el elemento de notas
    let note = document.getElementById('note');

    //                                                Agregar un manejador de eventos de clic a las notas
    note.addEventListener('click', function (event) {
        // Detener la propagación del evento para evitar que llegue al contenedor de la carpeta
        event.stopPropagation();
    });


    //                                                    Paginacion modals 




    //                                                      Resources /Icons
    // let itemsList = document.querySelectorAll('.itemList');
    // itemsList.forEach(item => {
    //     let boxIcon = item.querySelector('.box-icon');
    //     let card = item.querySelector('.card');
    //     console.log("boxIcon");
    //     console.log(boxIcon);
    //     console.log("card");
    //     console.log(card);
    //     card.style.width = "100%"
    //     card.style.height = "100%"
    //     boxIcon.addEventListener('mouseenter',function () {
    //         setTimeout(() => {
    //             boxIcon.style.display = "none"
    //             card.style.display = "flex";
    //             card.style.background = "red";
    //         }, 100);



    //     })
    //     card.addEventListener('mouseleave',function(){
    //         card.style.display = "none";
    //         boxIcon.style.display = "flex"
    //     })

    // });


    document.addEventListener("DOMContentLoaded", () => {
        let msgeWel = document.querySelector("#welcome");


        // Calcula el ancho basado en el contenido del texto
        let textLength = msgeWel.textContent.length;

        // Ajusta el ancho del contenedor del texto basado en el contenido del span
        msgeWel.style.width = textLength + "ch";

        // Establece la variable CSS para el número de pasos en la animación
        msgeWel.style.setProperty('--steps', textLength);
        // msgeWel.style.fontFamily = "windowsreg";


    });

    //Config manage
    let gearIcon = document.querySelector('#gear');
    let navConfig = document.querySelector('#navconfig');
    let flags = document.querySelector('.language-selector');
    let switchBtn = document.querySelector('.switch');
    gearIcon.style.color = "var(--second-color)";

    gearIcon.addEventListener("click", function () {
        if (navConfig.style.display === "flex") {
            navConfig.style.display = "none";
            flags.style.display = "none";
            switchBtn.style.display = "none";
            gearIcon.style.background = "";
            gearIcon.style.color = "var(--second-color)";
        } else {
            gearIcon.style.color = "var(--card-color)";
            gearIcon.style.background = "#7D8597";
            navConfig.style.display = "flex";
            navConfig.style.justifyContent = "space-around";
            navConfig.style.background = "#7D8597";
            flags.style.display = "flex";
            // flags.style.fontFamily = "windowsreg";
            switchBtn.style.display = "flex";
            // switchBtn.style.justifyContent = "space-between";
        }

    });


    const languageOptions = document.querySelectorAll(".language-option");

    function selectLanguage(language) {
        languageOptions.forEach(function (option) {
            if (option.id === language) {
                option.classList.add("active");
                loadSumm(0);
            } else {
                option.classList.remove("active");
            }
        });
    }


    const textsToChange = document.querySelectorAll('[data-section]');
    const changeLang = async language => { //Se usa async pq primero se lee y dps se displayea y como lleva tiempo debe ser asincrona

        if (!language) {
            language = "es";
        }
        const readJson = await fetch(`./json/${language}.json`);
        const texts = await readJson.json(); //Se transforma a obj json;
        for (textToMod of textsToChange) { //Un foreach raro
            const section = textToMod.dataset.section;
            const value = textToMod.dataset.value;
            textToMod.innerHTML = texts[section][value]; //del objeto json tomamos la clave valor para asignarla a al texto en el DOM correspondiente
            console.log("section");
            console.log(section);
            console.log("value");
            console.log(value);
            
            // if (msgeWel) {
            //     msgeWel.style.width = msgeWel.textContent.length + "ch";
            // }
        }
    }

    languageOptions.forEach(langu => {
        langu.addEventListener('click', (e) => {
            changeLang(e.target.dataset.language);
        })
    });
    let contactButton = document.getElementById('contactme');
    const divSummary = document.getElementById('summarysection');
    const modalContact = document.getElementById('modalContact');
    const contactForm = document.querySelector('.contactForm');
    
    contactButton.addEventListener('click', function () {
        buttonEffect(contactButton);
        if (contactForm.style.display === "none" || contactForm.style.display === "") {
            modalContact.style.display = "flex";
            contactForm.style.display = "flex";
            contactForm.style.alignItems = "center";
            contactForm.style.background = "var(--second-color)";

            
            // contactForm.style.height = "100%";
        } else if (contactForm.style.display === "flex") {
            
            contactForm.style.display = "none";
        }
    });

    const closeButtonsWin = document.querySelectorAll('.close-button');
    const minButtonsWin = document.querySelectorAll('.minimize-button');
    const maxButtonsWin = document.querySelectorAll('.maximize-button');
    closeButtonsWin.forEach(closebtn => {
        closebtn.addEventListener('click', function () {
            buttonEffect(closebtn);
            let modalToClose = closebtn.closest('.modal');
            modalToClose.style.display = "none";
        })
    });
    minButtonsWin.forEach(minbtn => {
        minbtn.addEventListener('click', function () {
            buttonEffect(minbtn);
            let modalToMin = minbtn.closest('.modal');
            modalToMin.style.display = "none";
        })
    });

    let maxxed = 0;
    let originalStyles = {};

    maxButtonsWin.forEach(maxbtn => {
        maxbtn.addEventListener('click', function () {
            buttonEffect(maxbtn);
            let modalMain = maxbtn.closest('.modal');
            let modalToMax = maxbtn.closest('.modal-content');
            let windowDiv = maxbtn.closest('.window');

            if (maxxed === 0) {
                // Guardar estilos originales solo si no están guardados
                if (!originalStyles.width) {
                    originalStyles = {
                        width: windowDiv.style.width,
                        height: windowDiv.style.height,
                        margin: windowDiv.style.margin,
                        displayModal: modalToMax.style.display,
                        marginModal: modalToMax.style.margin,
                        widthModal: modalToMax.style.width,
                        heightModal: modalToMax.style.height
                    };
                }
            }

            divIcon = maxbtn.querySelector('.maxfig');
            if (maxxed === 0) {
                divIcon.style.borderTop = "3px solid black";
                divIcon.style.borderBottom = "1px solid black";
                divIcon.style.borderRight = "1px solid black";
                divIcon.style.borderLeft = "1px solid black";

                modalMain.style.display = "block";
                modalMain.style.width = "100%";
                modalMain.style.height = "100%";

                windowDiv.style.display = "block";
                windowDiv.style.height = "100%"
                windowDiv.style.margin = "0 auto";

                modalToMax.style.display = "block";
                modalToMax.style.margin = "auto 0";
                modalToMax.style.width = "100%";
                modalToMax.style.height = "100%";
                maxxed = 1;
            } else {
                divIcon.style.border = "2px solid black";

                
                windowDiv.style.height = originalStyles.height;
                windowDiv.style.margin = originalStyles.margin;

                modalToMax.style.display = originalStyles.displayModal;
                modalToMax.style.margin = originalStyles.marginModal;
                modalToMax.style.width = originalStyles.widthModal;
                modalToMax.style.height = originalStyles.heightModal;
                maxxed = 0;
            }
            console.log(maxxed);
        })
    });

    document.addEventListener('DOMContentLoaded', function() {
        const boxIcones = document.querySelectorAll('.box-icon');
    
        boxIcones.forEach(function(iconBox) {
            iconBox.addEventListener('click', function() {
                console.log("entroo");
                const article = this.nextElementSibling.querySelector('article').innerHTML;
                console.log("Soy article");
                console.log(article);
                const modalText = document.querySelector('.modal-text');
                modalText.innerHTML = article;
                document.querySelector('.modalcard').style.display = 'flex';
                document.querySelector('.modalcard').style.justifyContent = 'center';
                document.querySelector('.modalcard').style.alignItems = 'center';
                document.body.style.overflow = "hidden"; // Deshabilitar el scroll del cuerpo
            });
        });
    
        document.querySelector('.closebtn').addEventListener('click', function() {
            document.querySelector('.modalcard').style.display = 'none';
            document.body.style.overflow = "auto";
        });
    });


    ///Limpiar inputs email post envio
    document.getElementById('submitForm').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#email').value = ''; // Limpia el campo del nombre
        document.querySelector('#number').value = ''; // Limpia el campo del correo electrónico
        document.querySelector('#fullname').value = ''; // Limpia el campo del mensaje
        document.querySelector('#subject').value = ''; // Limpia el campo del mensaje
        document.querySelector('#body').value = ''; // Limpia el campo del mensaje
    });

    //Color theme
    document.addEventListener('DOMContentLoaded', function() {
        const inputTheme = document.getElementById('inputTheme');
        let theme = document.querySelector("[data-theme]");
        console.log("soy theme");
        console.log(theme);
        inputTheme.addEventListener('change', function() { //Detecta cambio de estado
            if (inputTheme.checked) { //Detecta si esta checkeado o no;
                theme.setAttribute("data-theme","dark");
            } else {
                theme.setAttribute("data-theme","light");
            }
        });
    });

    // Font selector
    const fonts = document.querySelectorAll('.font-option');
    let body = document.querySelector('body');
    let selectedFont;
    function selectfont(fontname)
    {
        fonts.forEach(font => {
            
            if(fontname === font.id)
                {
                    console.log("fontid");
                    console.log(font.id);
                    font.classList.add('active');
                    body.style.fontFamily = fontname;
                    selectedFont = fontname;
                    contactButton.style.fontFamily = selectedFont;
                }else{
                    font.classList.remove('active');
                }   
        });
        
    }

    fonts.forEach(font => {
        font.addEventListener('click', (e) => {
            selectfont(e.target.dataset.font); //Extraigo el valor de data-font
            console.log("targetdataset");
            console.log(e.target.dataset.font);
            //Tuve que usar el contactButton acá pq NUNCA respondia al cambio de fuente
            console.log("selectedfont");
            console.log(selectedFont);

            // contactButton.style.fontFamily = selectedFont;

        })
    });