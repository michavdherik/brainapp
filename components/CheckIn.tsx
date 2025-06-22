'use client'

import { useState } from 'react'

const questions = [
  {
    id: 1,
    title: 'Hoe voel je je vandaag?',
    inputType: 'slider',
    placeholder: '1–10',
    field: 'feeling',
  },
  {
    id: 2,
    title: 'Welke klachten heb je vandaag?',
    inputType: 'checkbox',
    placeholder: 'Bijv. hoofdpijn, wazig zicht',
    field: 'symptoms',
  },
  {
    id: 3,
    title: 'Hoe intens zijn deze klachten?',
    inputType: 'slider',
    placeholder: 'Per klacht: 1–10',
    field: 'intensity',
  },
  {
    id: 4,
    title: 'Welke triggers ben je tegengekomen?',
    inputType: 'checkbox',
    placeholder: 'Bijv. schermgebruik, drukte',
    field: 'triggers',
  },
  {
    id: 5,
    title: 'Waar heb je je op gefocust?',
    inputType: 'checkbox',
    placeholder: 'Bijv. werk, familie, hobby',
    field: 'focus',
  },
]

interface CheckInAnswers {
  feeling?: string;
  symptoms?: string[];
  intensity?: string;
  triggers?: string[];
  focus?: string[];
}

interface CheckInProps {
  onCheckInComplete: (answers: Record<string, any>) => void;
}

export default function CheckIn({ onCheckInComplete }: CheckInProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleAnswer = (field: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      onCheckInComplete(answers);
    } else if (currentQuestion === null) {
      setCurrentQuestion((prev) => (prev !== null ? prev + 1 : null))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-between px-4 py-6">
      {/* Welcome Card */}
      {currentQuestion === null && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl text-blue-400 font-bold">🧠</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Start jouw herstel
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Doe vandaag je check-in en ontdek je patroon
          </p>
          <button
            className="w-full py-3 bg-blue-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-600 transition"
            onClick={handleNext}
          >
            Begin Check-in
          </button>
        </div>
      )}

      {/* Question Cards */}
      {currentQuestion !== null && currentQuestion < questions.length && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            {questions[currentQuestion].title}
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            {questions[currentQuestion].placeholder}
          </p>
          {/* Input Field */}
          {questions[currentQuestion].inputType === 'slider' && (
            <input
              type="range"
              min="1"
              max="10"
              className="w-full"
              value={answers[questions[currentQuestion].field] as string || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleAnswer(questions[currentQuestion].field, e.target.value)
              }
            />
          )}
          {questions[currentQuestion].inputType === 'checkbox' && (
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder={questions[currentQuestion].placeholder}
              value={Array.isArray(answers[questions[currentQuestion].field]) 
                ? answers[questions[currentQuestion].field].join(', ')
                : answers[questions[currentQuestion].field] || ''}
              onChange={(e) =>
                handleAnswer( // This handler likely needs more specific typing if you're dealing with arrays
                  questions[currentQuestion].field,
                  e.target.value.split(',').map(s => s.trim())
                )
              }
            />
          )}
          <button
            className="mt-6 w-full py-3 bg-blue-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-600 transition disabled:opacity-50"
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].field]}
          >
            {currentQuestion === questions.length - 1
              ? 'Voltooien'
              : 'Volgende'}
          </button>
        </div>
      )}

      {/* Summary Card */}
      {currentQuestion === questions.length && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Je check-in is voltooid!
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Hier is een samenvatting van je antwoorden:
          </p>
          <ul className="text-gray-700 text-left w-full">
            {questions.map((q) => (
              <li key={q.id} className="mb-2">
                <strong>{q.title}:</strong>{' '}
                {Array.isArray(answers[q.field])
                  ? answers[q.field].join(', ')
                  : answers[q.field] || 'Geen antwoord'}
              </li>
            ))}
          </ul>
          <button
            className="mt-6 w-full py-3 bg-blue-500 text-white text-lg font-medium rounded-full shadow-md hover:bg-blue-600 transition"
            onClick={() => setCurrentQuestion(null)}
          >
            Terug naar start
          </button>
        </div>
      )}
    </div>
  )
}
