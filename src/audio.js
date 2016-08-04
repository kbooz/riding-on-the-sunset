export default class Audio {
	constructor(url){
		try {
			this.context = new AudioContext();
		}
		catch(e) {
			alert('Web Audio API is not supported in this browser');
		}

		this.build
		this.source;
		this.sourceJs;
		this.analyser;
		this.buffer;
		this.url = url;
		this.array = new Array();

		this.request = new XMLHttpRequest();
		this.request.open('GET', this.url, true);
		this.request.responseType = "arraybuffer";
		this.request.onload = () => {
			this.context.decodeAudioData(
				this.request.response,
				buffer=> {
					if(!buffer) {
						return;
					}

					this.buffer = buffer;
					this.sourceJs = this.context.createScriptProcessor(2048);
					this.sourceJs.buffer = this.buffer;
					this.sourceJs.connect(this.context.destination);
					this.analyser = this.context.createAnalyser();
					this.analyser.smoothingTimeConstant = 0.6;
					this.analyser.fftSize = 512;

					this.source = this.context.createBufferSource();
					this.source.buffer = this.buffer;

					this.source.connect(this.analyser);
					this.analyser.connect(this.sourceJs);
					this.source.connect(this.context.destination);

					this.sourceJs.onaudioprocess = e => {
						this.array = new Uint8Array(this.analyser.frequencyBinCount);
						this.analyser.getByteFrequencyData(this.array);
					};

					this.source.start(0);
				},

				error=>{
				}
				);
		}
		this.request.send();
	}
};