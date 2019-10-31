 
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
        this.dist.curve = this.makeDistortionCurve(0)
        this.gain.gain.setValueAtTime(this.gainValue, this.now);
        this.oscillator.start(this.now);
        // this.oscillator.stop(this.now + 0.5);
    }

    this.volumeUp = window.addEventListener('mousemove',function(e){
        _this.drawCirle(e.clientX,e.clientY);
        _this.gainValue = (e.clientY-0)/(_this.height-0);
        _this.gain.gain.setValueAtTime(_this.gainValue,_this.now);

        // //normalize to 0 - 1 range
        _this.frequencyValue = (e.clientX-0)/(_this.width-0);

        // //normalize to 1000.3 - 196 range
        _this.frequencyValue = (_this.frequencyValue * (data.maxFrequency-data.minFrequency)) + data.minFrequency; 
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
        _this.dist.curve = _this.makeDistortionCurve(value);
      });

    this.makeDistortionCurve = function(amount) {
        var k = typeof amount === 'number' ? amount : 0,
          n_samples = 44100,
          curve = new Float32Array(n_samples),
          deg = Math.PI / 180,
          i = 0,
          x;
        for ( ; i < n_samples; ++i ) {
          x = i * 2 / n_samples - 1;
          curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
        }
        return curve;
    };
}