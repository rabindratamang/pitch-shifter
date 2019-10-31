function CrazyOscillator(data){
    this.canvas = document.querySelector(`#${data.canvasId}`);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvasContext = this.canvas.getContext("2d");

    this.range = document.querySelector('#range');

    this.context = new AudioContext();
    this.oscillator = this.context.createOscillator();
    this.dist = this.context.createWaveShaper();
    this.gain = this.context.createGain();
    this.now =  this.context.currentTime;

    this.gainValue = 1;
    this.frequencyValue = 440;
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    _this = this;

    this.init = function(){
    
        this.oscillator.type = 'sine';
        this.oscillator.frequency.value = this.frequencyValue;
        this.oscillator.connect(this.gain);
        
        this.gain.connect(this.dist);
        this.dist.connect(this.context.destination);
        this.dist.curve = makeDistortionCurve(0)
        this.gain.gain.setValueAtTime(this.gainValue, this.now);
        this.oscillator.start(this.now);
        // this.oscillator.stop(this.now + 0.5);
    }

    this.volumeUp = window.addEventListener('mousemove',function(e){
        _this.drawCirle(e.clientX,e.clientY);

        _this.gainValue = normalize(0,1,0,_this.height,e.clientY);
        _this.gain.gain.setValueAtTime(_this.gainValue,_this.now);

        _this.frequencyValue = normalize(data.minFrequency,data.maxFrequency,0,_this.width,e.clientX)
        _this.oscillator.frequency.value = _this.frequencyValue;
    })

    this.resize = window.addEventListener('resize',function(e){

        _this.height = window.innerHeight;
        _this.width = window.innerWidth;

        //change canvas height
        _this.canvas.width = _this.width;
        _this.canvas.height = _this.height;
    })

    this.drawCirle = function(clientX,clientY){
        let gradient = this.canvasContext.createLinearGradient(0, 0, _this.width, _this.height);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(0.5 ,"#44BFA3");
        gradient.addColorStop(1, "white");

        this.canvasContext.clearRect(0,0,_this.width,_this.height)
        this.canvasContext.beginPath();    
        this.canvasContext.arc(clientX, clientY, 50, 0, Math.PI * 2);
        this.canvasContext.fillStyle = gradient;
        this.canvasContext.fill();
    }

    this.rangeEvent = range.addEventListener('input', function(){
        let value = parseInt(this.value) * 5;
        _this.dist.curve = makeDistortionCurve(value);
    });
}