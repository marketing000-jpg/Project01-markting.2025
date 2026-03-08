import re

with open('case-studies.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = """    <style>
        .cs-wrapper {
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
        }
        .cs-section {
            padding: 10rem 4rem;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
        }
        .cs-inner {
            max-width: 1200px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
            position: relative;
            z-index: 5;
        }
        .cs-content-box {
            position: relative;
            z-index: 10;
        }
        .cs-eyebrow {
            font-family: var(--fb);
            font-size: 0.8rem;
            font-weight: 500;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: var(--choco);
            opacity: 0.7;
            margin-bottom: 1.5rem;
        }
        .cs-h2 {
            font-family: var(--ft);
            font-size: clamp(2.5rem, 4.5vw, 4.2rem);
            line-height: 1.05;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            color: var(--choco);
            margin-bottom: 1.5rem;
        }
        .cs-h2 em {
            font-family: var(--fd);
            font-style: italic;
            text-transform: none;
            color: var(--choco-light);
            font-weight: 400;
        }
        .cs-p {
            font-family: var(--fb);
            font-size: 1.15rem;
            color: var(--choco);
            opacity: 0.85;
            margin-bottom: 2.5rem;
            max-width: 90%;
            line-height: 1.6;
        }
        .cs-stat-glass {
            background: rgba(255, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.6);
            border-radius: 24px;
            padding: 2.5rem;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
            display: inline-block;
            transform: translateY(0);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .cs-stat-glass:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.08);
        }
        .cs-stat-num {
            font-family: var(--ft);
            font-size: 4rem;
            color: var(--choco);
            line-height: 1;
            margin-bottom: 0.5rem;
        }
        .cs-stat-label {
            font-family: var(--fb);
            font-size: 0.9rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: var(--choco);
            opacity: 0.8;
        }
        .cs-visual-box {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cs-glass-frame {
            position: relative;
            width: 100%;
            max-width: 480px;
            aspect-ratio: 4/5;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 40px;
            padding: 1.5rem;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.1);
            z-index: 5;
            transform: rotate(-1deg);
            transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
            overflow: visible;
        }
        .cs-glass-frame:hover {
            transform: rotate(0deg) scale(1.02);
            box-shadow: 0 50px 100px rgba(0, 0, 0, 0.15);
        }
        .cs-glass-inner {
            width: 100%;
            height: 100%;
            border-radius: 24px;
            overflow: hidden;
            position: relative;
        }
        .cs-glass-inner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.05);
            transition: transform 0.6s ease;
        }
        .cs-glass-frame:hover .cs-glass-inner img {
            transform: scale(1);
        }

        /* Animated Text Background (Homepage style) */
        .cs-scrolling-bg {
            position: absolute;
            inset: -20% -30%;
            transform: rotate(-8deg);
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 1.5rem;
            pointer-events: none;
            opacity: 0.10;
            z-index: 1;
        }
        .cs-scrolling-bg span {
            font-family: var(--ft);
            font-size: clamp(5rem, 8vw, 8rem);
            font-weight: 900;
            line-height: 0.8;
            color: #fff;
            white-space: nowrap;
            text-transform: uppercase;
            display: block;
            letter-spacing: -0.01em;
            animation: scroll-left-cs 90s linear infinite;
        }
        .cs-scrolling-bg span:nth-child(even) {
            animation: scroll-right-cs 90s linear infinite;
        }
        @keyframes scroll-left-cs {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right-cs {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
        }
        
        @media (max-width: 960px) {
            .cs-inner {
                grid-template-columns: 1fr;
                gap: 4rem;
            }
            .cs-section {
                padding: 6rem 1.8rem;
            }
            .cs-visual-box {
                order: -1;
            }
            .cs-order-2 {
                order: 2;
            }
        }
    </style>

    <div class="cs-wrapper">
        <!-- Case Study 01: Pizzeria (Sky Color) -->
        <section class="cs-section reveal" style="background-color: #c1d7e9;">
            <div class="cs-scrolling-bg">
                <span>GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA</span>
                <span>MARKETING SEO MARKETING SEO MARKETING SEO MARKETING SEO MARKETING SEO MARKETING SEO</span>
                <span>RISULTATI REALI RISULTATI REALI RISULTATI REALI RISULTATI REALI RISULTATI REALI</span>
                <span>TOP 3 MAPS TOP 3 MAPS TOP 3 MAPS TOP 3 MAPS TOP 3 MAPS TOP 3 MAPS TOP 3 MAPS TOP 3 MAPS</span>
                <span>GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA GUIDONIA</span>
                <span>MARKETING SEO MARKETING SEO MARKETING SEO MARKETING SEO MARKETING SEO MARKETING SEO</span>
            </div>
            
            <div class="cs-inner">
                <div class="cs-content-box">
                    <p class="cs-eyebrow">Ristorazione · Guidonia</p>
                    <h2 class="cs-h2">Pizzeria Storica,<br>da invisibile a <em>Top 3.</em></h2>
                    <p class="cs-p">L'attività non appariva nelle ricerche locali nonostante i 20 anni di storia. Tutto il traffico della zona veniva assorbito dalle grandi catene nazionali. Con una strategia mirata abbiamo ribaltato la situazione.</p>
                    
                    <div class="cs-stat-glass">
                        <div class="cs-stat-num">+280%</div>
                        <div class="cs-stat-label">Chiamate dirette<br>da Google Maps</div>
                    </div>
                </div>
                
                <div class="cs-visual-box">
                    <div class="cs-glass-frame" style="transform: rotate(2deg);">
                        <div class="cs-glass-inner">
                            <img src="assets/img/portfolio/seo-case.png" alt="Risultati Pizzeria Google Maps">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Case Study 02: Studio Medico (Purple Color) -->
        <section class="cs-section reveal" style="background-color: #d5bdfc;">
            <div class="cs-scrolling-bg">
                <span>LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO</span>
                <span>TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI</span>
                <span>MENO COSTI MENO COSTI MENO COSTI MENO COSTI MENO COSTI MENO COSTI MENO COSTI MENO COSTI</span>
                <span>NUOVI CLIENTI NUOVI CLIENTI NUOVI CLIENTI NUOVI CLIENTI NUOVI CLIENTI NUOVI CLIENTI</span>
                <span>LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO LOCAL SEO</span>
                <span>TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI TIVOLI</span>
            </div>
            
            <div class="cs-inner">
                <div class="cs-visual-box cs-order-2">
                    <div class="cs-glass-frame" style="transform: rotate(-2deg); border-color: rgba(255, 255, 255, 0.6);">
                        <div class="cs-glass-inner">
                            <img src="assets/img/foto/foto_iphone_4.jpg" alt="Risultati Studio Medico">
                        </div>
                    </div>
                </div>

                <div class="cs-content-box">
                    <p class="cs-eyebrow">Servizi Medici · Tivoli</p>
                    <h2 class="cs-h2">Studio Medico,<br>più lead, <em>meno costi.</em></h2>
                    <p class="cs-p">Dipendenza totale da Google Ads con costi di acquisizione paziente letteralmente insostenibili (€25 per lead). In soli 6 mesi abbiamo rivoluzionato il flusso con una strategia SEO dedicata alle patologie specifiche.</p>
                    
                    <div class="cs-stat-glass" style="background: rgba(255, 255, 255, 0.3);">
                        <div class="cs-stat-num">-70%</div>
                        <div class="cs-stat-label">Costo per acquisizione<br>paziente (CPA)</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Case Study 03: Negozio (Blush Color) -->
        <section class="cs-section reveal" style="background-color: #eccecc;">
            <div class="cs-scrolling-bg">
                <span>BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING</span>
                <span>SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA</span>
                <span>VILLANOVA VILLANOVA VILLANOVA VILLANOVA VILLANOVA VILLANOVA VILLANOVA VILLANOVA VILLANOVA</span>
                <span>IDENTITÀ VISIVA IDENTITÀ VISIVA IDENTITÀ VISIVA IDENTITÀ VISIVA IDENTITÀ VISIVA</span>
                <span>BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING BRANDING</span>
                <span>SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA SOCIAL MEDIA</span>
            </div>
            
            <div class="cs-inner">
                <div class="cs-content-box">
                    <p class="cs-eyebrow">Retail · Villanova</p>
                    <h2 class="cs-h2">Store d'Abbigliamento:<br><em>Brand Authority</em> locale.</h2>
                    <p class="cs-p">Ottimi prodotti ma percepiti come "negozio di quartiere" qualunque. Basso afflusso di nuovi clienti da fuori Guidonia. Con un rebranding completo e focus su TikTok, abbiamo costruito una vera identità premium.</p>
                    
                    <div class="cs-stat-glass">
                        <div class="cs-stat-num">+45%</div>
                        <div class="cs-stat-label">Nuovi ingressi in store<br>documentati</div>
                    </div>
                </div>
                
                <div class="cs-visual-box">
                    <div class="cs-glass-frame" style="transform: rotate(1.5deg);">
                        <div class="cs-glass-inner">
                            <img src="assets/img/portfolio/smm-case.png" alt="Risultati Store Abbigliamento">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
"""

pattern = re.compile(r'<style>.*?</div>\s+</div>\s+</section>\s+</div>', re.DOTALL)
content = pattern.sub(new_content, content)

with open('case-studies.html', 'w', encoding='utf-8') as f:
    f.write(content)
