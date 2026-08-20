export class AccessibilityEngine {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  public static speak(text: string, lang: 'en' | 'hi' | 'mr' = 'en', rate: number = 1.0) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-US';

    this.synth.speak(utterance);
  }

  public static stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public static announceToScreenReader(message: string) {
    if (typeof document === 'undefined') return;
    let liveRegion = document.getElementById('a11y-live-region');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-live-region';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only absolute w-1 h-1 overflow-hidden clip-rect-0';
      document.body.appendChild(liveRegion);
    }
    liveRegion.textContent = message;
  }
}
