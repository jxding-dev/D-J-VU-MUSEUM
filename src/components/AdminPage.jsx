import { useMemo, useState } from 'react'

const blankDream = {
  date: '',
  emotion: '',
  title: '',
  line: '',
  body: '',
}

const blankImage = {
  tag: '꿈',
  title: '',
  mark: '',
  src: '',
}

const blankRoom = {
  slug: '',
  code: '',
  title: '',
  text: '',
  pageTitle: '',
  pageLead: '',
  pageNotes: '',
}

function Field({ label, children }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

function AdminPage({ data, onChange, onClose, onReset }) {
  const [dreamForm, setDreamForm] = useState(blankDream)
  const [imageForm, setImageForm] = useState(blankImage)
  const [noteForm, setNoteForm] = useState('')
  const [roomForm, setRoomForm] = useState(blankRoom)
  const [copyState, setCopyState] = useState('JSON 복사')

  const exportJson = useMemo(() => JSON.stringify(data, null, 2), [data])

  const updateDream = (key, value) => setDreamForm((form) => ({ ...form, [key]: value }))
  const updateImage = (key, value) => setImageForm((form) => ({ ...form, [key]: value }))
  const updateRoom = (key, value) => setRoomForm((form) => ({ ...form, [key]: value }))

  const addDream = (event) => {
    event.preventDefault()
    if (!dreamForm.title.trim() || !dreamForm.line.trim()) return
    onChange({
      ...data,
      dreams: [...data.dreams, { ...dreamForm, title: dreamForm.title.trim(), line: dreamForm.line.trim() }],
    })
    setDreamForm(blankDream)
  }

  const addImage = (event) => {
    event.preventDefault()
    if (!imageForm.title.trim() || !imageForm.src.trim()) return
    onChange({
      ...data,
      images: [
        ...data.images,
        {
          ...imageForm,
          id: Date.now(),
          title: imageForm.title.trim(),
          src: imageForm.src.trim(),
          mark: imageForm.mark.trim() || `${imageForm.tag}-${String(data.images.length + 1).padStart(3, '0')}`,
        },
      ],
    })
    setImageForm(blankImage)
  }

  const addNote = (event) => {
    event.preventDefault()
    const note = noteForm.trim()
    if (!note) return
    onChange({ ...data, notes: [...data.notes, note] })
    setNoteForm('')
  }

  const addRoom = (event) => {
    event.preventDefault()
    if (!roomForm.slug.trim() || !roomForm.title.trim()) return
    onChange({
      ...data,
      rooms: [
        ...data.rooms,
        {
          ...roomForm,
          slug: roomForm.slug.trim(),
          title: roomForm.title.trim(),
          pageNotes: roomForm.pageNotes
            .split('\n')
            .map((note) => note.trim())
            .filter(Boolean),
        },
      ],
    })
    setRoomForm(blankRoom)
  }

  const removeItem = (type, index) => {
    onChange({
      ...data,
      [type]: data[type].filter((_, itemIndex) => itemIndex !== index),
    })
  }

  const copyJson = async () => {
    await navigator.clipboard.writeText(exportJson)
    setCopyState('복사됨')
    window.setTimeout(() => setCopyState('JSON 복사'), 1200)
  }

  return (
    <aside className="admin-page" role="dialog" aria-modal="true" aria-labelledby="admin-title">
      <header className="admin-header">
        <div>
          <p>기시감 박물관 / 관리자</p>
          <h2 id="admin-title">전시 내용 추가</h2>
        </div>
        <button type="button" onClick={onClose}>
          닫기
        </button>
      </header>

      <div className="admin-grid">
        <form className="admin-panel" onSubmit={addDream}>
          <h3>꿈 기록</h3>
          <Field label="시간 / 날짜">
            <input value={dreamForm.date} onChange={(event) => updateDream('date', event.target.value)} />
          </Field>
          <Field label="제목">
            <input required value={dreamForm.title} onChange={(event) => updateDream('title', event.target.value)} />
          </Field>
          <Field label="짧은 문장">
            <textarea required value={dreamForm.line} onChange={(event) => updateDream('line', event.target.value)} />
          </Field>
          <Field label="상세 기록">
            <textarea value={dreamForm.body} onChange={(event) => updateDream('body', event.target.value)} />
          </Field>
          <Field label="감정">
            <input value={dreamForm.emotion} onChange={(event) => updateDream('emotion', event.target.value)} />
          </Field>
          <button type="submit">꿈 추가</button>
        </form>

        <form className="admin-panel" onSubmit={addImage}>
          <h3>이미지 전시</h3>
          <Field label="분류">
            <select value={imageForm.tag} onChange={(event) => updateImage('tag', event.target.value)}>
              <option>꿈</option>
              <option>기억</option>
              <option>오류</option>
              <option>금지</option>
            </select>
          </Field>
          <Field label="제목">
            <input required value={imageForm.title} onChange={(event) => updateImage('title', event.target.value)} />
          </Field>
          <Field label="표식">
            <input value={imageForm.mark} onChange={(event) => updateImage('mark', event.target.value)} />
          </Field>
          <Field label="이미지 주소">
            <input
              required
              placeholder="https://... 또는 /D-J-VU-MUSEUM/gallery/file.png"
              value={imageForm.src}
              onChange={(event) => updateImage('src', event.target.value)}
            />
          </Field>
          <button type="submit">이미지 추가</button>
        </form>

        <form className="admin-panel" onSubmit={addNote}>
          <h3>문장 메모</h3>
          <Field label="메모 문장">
            <textarea required value={noteForm} onChange={(event) => setNoteForm(event.target.value)} />
          </Field>
          <button type="submit">메모 추가</button>
        </form>

        <form className="admin-panel" onSubmit={addRoom}>
          <h3>복도 전시실</h3>
          <Field label="슬러그">
            <input required placeholder="new-room" value={roomForm.slug} onChange={(event) => updateRoom('slug', event.target.value)} />
          </Field>
          <Field label="번호">
            <input value={roomForm.code} onChange={(event) => updateRoom('code', event.target.value)} />
          </Field>
          <Field label="전시실명">
            <input required value={roomForm.title} onChange={(event) => updateRoom('title', event.target.value)} />
          </Field>
          <Field label="복도 설명">
            <textarea value={roomForm.text} onChange={(event) => updateRoom('text', event.target.value)} />
          </Field>
          <Field label="상세 제목">
            <input value={roomForm.pageTitle} onChange={(event) => updateRoom('pageTitle', event.target.value)} />
          </Field>
          <Field label="상세 설명">
            <textarea value={roomForm.pageLead} onChange={(event) => updateRoom('pageLead', event.target.value)} />
          </Field>
          <Field label="상세 기록 목록">
            <textarea
              placeholder="한 줄에 하나씩 입력"
              value={roomForm.pageNotes}
              onChange={(event) => updateRoom('pageNotes', event.target.value)}
            />
          </Field>
          <button type="submit">전시실 추가</button>
        </form>
      </div>

      <section className="admin-output">
        <div>
          <h3>현재 데이터</h3>
          <p>
            전시실 {data.rooms.length}개 / 꿈 {data.dreams.length}개 / 이미지 {data.images.length}개 / 메모 {data.notes.length}개
          </p>
        </div>
        <div className="admin-actions">
          <button type="button" onClick={copyJson}>
            {copyState}
          </button>
          <button type="button" onClick={onReset}>
            초기화
          </button>
        </div>
        <textarea readOnly value={exportJson} />
      </section>

      <section className="admin-list">
        <h3>빠른 삭제</h3>
        <div>
          {data.dreams.map((dream, index) => (
            <button type="button" key={`dream-${dream.title}-${index}`} onClick={() => removeItem('dreams', index)}>
              꿈 삭제 / {dream.title}
            </button>
          ))}
          {data.images.map((image, index) => (
            <button type="button" key={`image-${image.title}-${index}`} onClick={() => removeItem('images', index)}>
              이미지 삭제 / {image.title}
            </button>
          ))}
          {data.notes.map((note, index) => (
            <button type="button" key={`note-${index}`} onClick={() => removeItem('notes', index)}>
              메모 삭제 / {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}

export default AdminPage
