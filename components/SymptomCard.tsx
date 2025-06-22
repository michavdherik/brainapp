'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const SymptomCard = ({ onNext }: { onNext: (symptoms: string[]) => void }) => { // Keep the type, remove the parameter name
  const [symptoms, setSymptoms] = useState<string[]>([])
  const symptomOptions = ['Headache', 'Dizziness', 'Nausea', 'Fatigue']

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    )
  }

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-3 text-center text-gray-800">
        How are you feeling today?
      </h2>
      <p className="text-gray-500 mb-6 text-center">
        Select your symptoms below:
      </p>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {symptomOptions.map((symptom) => (
          <button
            key={symptom}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              symptoms.includes(symptom)
                ? 'bg-softBlue text-white border-softBlue'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300'
            }`}
            onClick={() => toggleSymptom(symptom)}
          >
            {symptom}
          </button>
        ))}
      </div>
      <button
        className="w-full mt-4 px-6 py-3 bg-pastelGreen text-white rounded-full shadow-md hover:bg-green-400 disabled:bg-gray-300 transition"
        onClick={() => onNext(symptoms)}
        disabled={symptoms.length === 0}
      >
        Next
      </button>
    </motion.div>
  )
}

export default SymptomCard
