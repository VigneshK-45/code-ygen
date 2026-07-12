import express from 'express'
import cors from 'cors'
import { createUser, getUserByEmail, verifyPassword, createSession, getSessionByToken, deleteSession } from './lib/auth'
import { getUserById } from './lib/auth'

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())

// Sign up endpoint
app.post('/api/auth/sign-up', async (req, res) => {
  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    const user = await createUser(email, password, name)
    const session = await createSession(user.id)

    res.json({
      user,
      session: {
        token: session.token,
      },
    })
  } catch (error) {
    console.error('Sign up error:', error)
    res.status(500).json({ error: 'Sign up failed' })
  }
})

// Sign in endpoint
app.post('/api/auth/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const session = await createSession(user.id)

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      session: {
        token: session.token,
      },
    })
  } catch (error) {
    console.error('Sign in error:', error)
    res.status(500).json({ error: 'Sign in failed' })
  }
})

// Get current user endpoint
app.get('/api/auth/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const session = await getSessionByToken(token)
    if (!session) {
      return res.status(401).json({ error: 'Invalid session' })
    }

    if (new Date(session.expiresAt) < new Date()) {
      await deleteSession(session.id)
      return res.status(401).json({ error: 'Session expired' })
    }

    const user = await getUserById(session.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Failed to get user' })
  }
})

// Sign out endpoint
app.post('/api/auth/sign-out', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const session = await getSessionByToken(token)
    if (session) {
      await deleteSession(session.id)
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Sign out error:', error)
    res.status(500).json({ error: 'Sign out failed' })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
