const db = require('../../data/db-config')

function find() { // EXERCISE A
  return db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .groupBy('sc.scheme_id')
    .select('sc.*')
    .count('st.step_id as number_of_steps')
    .orderBy('sc.scheme_id', 'asc')
}


async function findById(scheme_id) { // EXERCISE B
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_id', 'sc.scheme_name', 'st.step_id', 'st.step_number', 'st.instructions')
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number', 'asc')

  if (rows.length === 0) {
    return null
  }

  const scheme = {
    scheme_id: rows[0].scheme_id,
    scheme_name: rows[0].scheme_name,
    steps: []
  }

  if (rows[0].step_id) { // check if there are steps
    scheme.steps = rows.map(row => ({
      step_id: row.step_id,
      step_number: row.step_number,
      instructions: row.instructions
    }))
  }

  return scheme
}
function findSteps(scheme_id) { // EXERCISE C
  return db('steps as st')
  .join('schemes as sc', 'st.scheme_id', 'sc.scheme_id')
  .select('st.step_id', 'st.step_number', 'st.instructions', 'sc.scheme_name')
  .where('st.scheme_id', scheme_id)
  .orderBy('st.step_number', 'asc')
}

async function add(scheme) { // EXERCISE D
  const [id] = await db('schemes').insert(scheme)
  return findById(id)
}

async function addStep(scheme_id, step) { // EXERCISE E
  await db('steps').insert({ ...step, scheme_id })
  return findSteps(scheme_id)
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
