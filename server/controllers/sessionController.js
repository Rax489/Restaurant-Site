const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createSession(sessionData) {
  try {
    const session = await prisma.session.create({ data: sessionData });
    return session;
  } catch (error) {
    throw new Error('Error creating session');
  }
}

async function getSessions() {
  try {
    const sessions = await prisma.session.findMany();
    return sessions;
  } catch (error) {
    throw new Error('Error getting sessions');
  }
}

async function getSessionById(sessionId) {
  try {
    const session = await prisma.session.findUnique({ where: { id: sessionId } });
    return session;
  } catch (error) {
    throw new Error('Error getting session by ID');
  }
}

async function deleteSession(sessionId) {
  try {
    const deletedSession = await prisma.session.delete({ where: { id: sessionId } });
    return deletedSession;
  } catch (error) {
    throw new Error('Error deleting session');
  }
}

async function clearSessions() {
  try {
    const deletedSessions = await prisma.session.deleteMany();
    return deletedSessions;
  } catch (error) {
    throw new Error('Error clearing sessions');
  }
}

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  deleteSession,
  clearSessions
};
