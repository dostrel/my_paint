    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var clickColor = new Array();
    var clickSize = new Array();
    var clickX2 = new Array();
    var clickY2 = new Array();
    var curColor;
    var curSize;
    var origin = true;
    var paint;
    var tool;
    var mouseX;
    var mouseY;
    var mouseH;
    var mouseW;
    var mouse;
    var mouseTow;
    var symetrie = 'desactiver';
    var mousY2;
    var mousW2;
    var imageLoader = document.getElementById('imageLoader');
    var context = document.getElementById('canvas').getContext("2d");



    function crayon()
    {
        $('#canvas').mousedown(function (e)
        {
            paint = true;
        });

        $('#canvas').mousemove(function (e)
        {
            mouseX = e.pageX - this.offsetLeft;
            mouseY = e.pageY - this.offsetTop;
            mousY2 = Math.abs(e.pageY - this.offsetHeight);

            if (paint)
            {
                if (symetrie === 'activer')
                {
                    clickX2.push(mouseX);
                    clickY2.push(mousY2);
                    addClick(mouseX,mouseY, true);
                    redraw();
                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);
                        }));
                }
                addClick(mouseX,mouseY, true);
                redraw();
            }
        });

        $('#canvas').mouseup(function (e)
        {
            clickX = new Array();
            clickY = new Array();
            for(var i = 0 ; i < clickX2.length ; i += 1 )
            {
                addClick(clickX2[i], clickY2[i], true);
                redraw();
            }
            clickX2 = new Array();
            clickY2 = new Array();
            clickX = new Array();
            clickY = new Array();
            paint = false;

        });

        $('#canvas').mouseleave(function (e)
        {
            paint = false;
        });
    }



    function addClick(x, y, dragging)
    {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }



    function redraw()
    {
        //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        for (var i = 0; i < clickX.length; i += 1)
        {
            context.beginPath();
            if (clickDrag[i] && i)
            {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else
            {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.strokeStyle = clickColor[i];
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.lineWidth = clickSize[i];
            context.stroke();
        }
    }



    $('#color').on('change', function ()
    {
        curColor = $(this).val();
        context.strokeStyle = curColor;
        context.fillStyle = curColor;
    });


    $('#size').on('change', function ()
    {
        curSize = $(this).val();
        context.lineJoin = "round";
        context.lineWidth = curSize;
    });

    $('#symetry').click( function ()
    {
        symetrie = 'activer';
        console.log(symetrie);
    });


    function rectangle()
    {
        $('#canvas').mousedown(function (e)
        {
            if (origin)
            {
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);

                origin = false;
            }
            else if (!origin)
            {
                mouseH = e.pageX - this.offsetLeft;
                mouseW = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);

                if (symetrie === 'activer')
                {
                    context.beginPath();
                    mouse = mouseH - mouseX;
                    mouseTow = mouseW - mouseY;
                    context.rect(mouseX, mouseY, mouse, mouseTow);
                    context.rect(mouseX, mousY2, mouse, mouseTow);
                    context.stroke();
                    origin = true;
                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);

                        }));
                }
                else
                {
                    context.beginPath();
                    mouse = mouseH - mouseX;
                    mouseTow = mouseW - mouseY;
                    context.rect(mouseX, mouseY, mouse, mouseTow);
                    origin = true;
                    context.stroke();
                }
            }
        });
    }


    function RectanglePlein()
    {
        $('#canvas').mousedown(function (e)
        {
            if (origin)
            {
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);

                origin = false;
            }
            else if (!origin)
            {
                mouseH = e.pageX - this.offsetLeft;
                mouseW = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);


                if (symetrie === 'activer')
                {
                    context.beginPath();
                    mouse = mouseH - mouseX;
                    mouseTow = mouseW - mouseY;
                    context.rect(mouseX, mouseY, mouse, mouseTow);
                    context.rect(mouseX, mousY2, mouse, mouseTow);
                    context.fill();
                    origin = true;

                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);

                        }));
                }
                context.beginPath();
                mouse = mouseH - mouseX;
                mouseTow = mouseW - mouseY;
                context.rect(mouseX, mouseY, mouse, mouseTow);
                context.fill();
                origin = true;
            }
        });
    }

    function trait()
    {
        var mousW2;

        $('#canvas').mousedown(function (e)
        {
            if (origin)
            {
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);
                origin = false;
            }

            else if (!origin)
            {
                mouseH = e.pageX - this.offsetLeft;
                mouseW = e.pageY - this.offsetTop;
                mousW2 = Math.abs(e.pageY - this.offsetHeight);

                if (symetrie === 'activer')
                {
                    context.beginPath();
                    context.moveTo(mouseX,mouseY);
                    context.lineTo(mouseH,mouseW);
                    context.moveTo(mouseX,mousY2);
                    context.lineTo(mouseH,mousW2);
                    context.stroke();
                    origin = true;

                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);
                        }));
                }
                context.beginPath();
                context.moveTo(mouseX,mouseY);
                context.lineTo(mouseH,mouseW);
                context.stroke();
                origin = true;
            }
        });
    }


    function circle()
    {


        $('#canvas').mousedown(function (e)
        {
            if (origin)
            {
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);

                origin = false;
            }
            else if (!origin)
            {
                mouseH = e.pageX - this.offsetLeft;
                mouseW = e.pageY - this.offsetTop;
                mousW2 = Math.abs(e.pageY - this.offsetHeight);
                mouseTow = mouseW - mouseY;
                mouse = mouseH - mouseX;

                if (symetrie === 'activer')
                {
                    context.beginPath();
                    context.arc(mouseX, mouseY, Math.sqrt(Math.pow(mouse, 2) + Math.pow(mouseTow, 2)), 0, 2 * Math.PI);
                    context.stroke();

                    context.beginPath();
                    context.arc(mouseX, mousY2, Math.sqrt(Math.pow(mouse, 2) + Math.pow(mouseTow, 2)), 0, 2 * Math.PI);
                    context.stroke();
                    origin = true;

                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);

                        }));
                }
                mouseH = e.pageX - this.offsetLeft;
                mouseW = e.pageY - this.offsetTop;
                mouse = mouseH - mouseX;
                mouseTow = mouseW - mouseY;
                context.beginPath();
                context.arc(mouseX, mouseY, Math.sqrt(Math.pow(mouse, 2) + Math.pow(mouseTow, 2)), 0, 2 * Math.PI);
                context.stroke();
                origin = true;
            }
        })
    }


    function circlePlein()
    {
        $('#canvas').mousedown(function (e)
        {
            if (origin)
            {
                mouseX = e.pageX - this.offsetLeft;
                mouseY = e.pageY - this.offsetTop;
                mousY2 = Math.abs(e.pageY - this.offsetHeight);

                origin = false;
            }
            else if (!origin)
            {
                mouseH = e.pageX - this.offsetLeft;
                mouseW = e.pageY - this.offsetTop;
                mousW2 = Math.abs(e.pageY - this.offsetHeight);
                mouseTow = mouseW - mouseY;
                mouse = mouseH - mouseX;

                if (symetrie === 'activer')
                {
                    context.beginPath();
                    context.arc(mouseX, mouseY, Math.sqrt(Math.pow(mouse, 2) + Math.pow(mouseTow, 2)), 0, 2 * Math.PI);
                    context.fill();

                    context.beginPath();
                    context.arc(mouseX, mousY2, Math.sqrt(Math.pow(mouse, 2) + Math.pow(mouseTow, 2)), 0, 2 * Math.PI);
                    context.fill();
                    origin = true;

                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);

                        }));
                }
                context.beginPath();
                context.arc(mouseX, mouseY, Math.sqrt(Math.pow(mouse, 2) + Math.pow(mouseTow, 2)), 0, 2 * Math.PI);
                context.fill();
                origin = true;
            }
        });
    }

    function gomme()
    {
        $('#canvas').mousedown(function (e)
        {
            paint = true;
        });


        $('#canvas').mousemove(function (e)
        {
            if (paint)
            {
                console.log('oups');
                console.log(symetrie);

                if (symetrie === 'activer')
                {
                    console.log('je rentre');
                    context.clearRect(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, curSize, curSize );
                    context.clearRect(e.pageX - this.offsetLeft, Math.abs(e.pageY - this.offsetHeight), curSize, curSize );

                    if ( $('#symetryDesactiver').click( function ()
                        {
                            symetrie = 'desactiver';
                            console.log(symetrie);

                        }));
                }
                context.clearRect(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, curSize, curSize );
            }
        });

        $('#canvas').mouseup(function (e)
        {
            paint = false;
        });

        $('#canvas').mouseleave(function (e)
        {
            paint = false;
        });
    }

    function download()
    {
        var file = canvas.toDataURL('image/png');
        this.href = file;
    }

    imageLoader.addEventListener('change', handleImage, false);

    function handleImage(e)
    {
        var reader = new FileReader();
        reader.onload = function(event)
        {
            var img = new Image();
            img.onload = function()
            {
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img,0,0);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
    downloadFile.addEventListener('click', download, false);



    $('.edition').click(function()
    {
        $('#canvas').unbind();
        tool = $(this).val();
        console.log(tool);

        switch (tool)
        {
            case "crayon":
               // context.globalCompositeOperation = 'source-over';
                return crayon();
            case "rectangle":
                //context.globalCompositeOperation = 'source-over';
                return rectangle();
            case "trait":
               // context.globalCompositeOperation = 'source-over';
                return trait();
            case "RectanglePlein":
               // context.globalCompositeOperation = 'source-over';
                return RectanglePlein();
            case "circle":
                //context.globalCompositeOperation = 'source-over';
                return circle();
            case "circlePlein":
                //context.globalCompositeOperation = 'source-over';
                return circlePlein();
            case "gomme":
                // context.globalCompositeOperation = 'destination-out';
                return gomme();

        }
    })
