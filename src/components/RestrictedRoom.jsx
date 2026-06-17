import { useState } from 'react'

function RestrictedRoom() {
  const [open, setOpen] = useState(false)

  return (
    <section className={open ? 'restricted section-shell is-open' : 'restricted section-shell'} id="restricted-room">
      <div className="restricted-copy">
        <p className="section-kicker">ROOM 04 / RESTRICTED ROOM</p>
        <h2 className="glitch" data-text="This room remembers you first.">This room remembers you first.</h2>
        <p>
          열람 제한 구역입니다. 기록이 흐릿하게 보인다면 아직 박물관이 관람자를 분류하는 중입니다.
        </p>
      </div>
      <button className="restricted-panel" type="button" onClick={() => setOpen(true)} data-cursor="UNSEAL">
        <span>{open ? 'ACCESS LOG RESTORED' : 'CLICK TO UNSEAL'}</span>
        <strong>{open ? '당신은 이 방을 처음 본 것이 아닙니다.' : 'RESTRICTED MATERIAL'}</strong>
      </button>
    </section>
  )
}

export default RestrictedRoom
