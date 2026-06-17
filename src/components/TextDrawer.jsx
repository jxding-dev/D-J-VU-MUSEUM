import { motion } from 'motion/react'
import { notes } from '../data/exhibits'

function TextDrawer() {
  return (
    <section className="text-drawer section-shell" id="text-drawer">
      <div className="drawer-head">
        <p className="section-kicker">ROOM 03 / TEXT DRAWER</p>
        <h2 data-reveal>Fragments misbehave when removed from their drawer.</h2>
      </div>
      <div className="drawer-slab">
        {notes.map((note, index) => (
          <motion.article
            drag
            dragElastic={0.2}
            whileDrag={{ scale: 1.04, rotate: index % 2 ? -4 : 4, zIndex: 4 }}
            whileHover={{ y: -8, rotate: index % 2 ? -2 : 2 }}
            className="note-card"
            key={note}
            data-cursor="DRAG"
          >
            <span>NOTE {String(index + 1).padStart(2, '0')}</span>
            <p>{note}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default TextDrawer
