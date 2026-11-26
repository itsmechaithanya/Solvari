import React from 'react'

function Navbar() {
  return (
    <header className="w-full flex items-center justify-between">
      <h1 className="font-gilroy-bold text-xl sm:text-2xl tracking-tight text-black select-none">
        Solvari
      </h1>
      
      {/* 3x3 Dot Grid Icon */}
      <button
        type="button"
        aria-label="Menu"
        className="grid grid-cols-3 gap-1 p-1.5 rounded hover:opacity-70 transition-opacity cursor-pointer font-gilroy-medium"
      >
        {[...Array(9)].map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 bg-black rounded-full" />
        ))}
      </button>
    </header>
  )
}

export default Navbar
