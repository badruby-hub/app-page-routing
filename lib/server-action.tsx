"use server";

export async function addGrade(formData: FormData) {

  const
    studentId = formData.get('studentId') as string, point = formData.get('point') as string;
  fetch('http://localhost:3000/api/grade', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, point })
  });
}