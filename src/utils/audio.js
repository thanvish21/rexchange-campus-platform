// Web Audio API Sound FX generator (zero external dependencies)

class SoundFX {
  constructor() {
    this.ctx = null
    this.muted = false
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  playPop() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(400, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08)
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.08)
    } catch {
      // Audio fallback
    }
  }

  playSuccess() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      const now = this.ctx.currentTime
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + idx * 0.06)
        gain.gain.setValueAtTime(0.1, now + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now + idx * 0.06)
        osc.stop(now + idx * 0.06 + 0.2)
      })
    } catch {
      // Audio fallback
    }
  }

  playCelebration() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      if (this.ctx.state === 'suspended') this.ctx.resume()
      const now = this.ctx.currentTime
      const chord = [523.25, 783.99, 1046.5, 1318.51]
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + i * 0.05)
        gain.gain.setValueAtTime(0.12, now + i * 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35)
        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now + i * 0.05)
        osc.stop(now + i * 0.05 + 0.35)
      })
    } catch {}
  }

  playSnap() {
    if (this.muted) return
    try {
      this.init()
      if (!this.ctx) return
      if (this.ctx.state === 'suspended') this.ctx.resume()
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(900, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04)
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)
      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch {}
  }
}

export const sounds = new SoundFX()
