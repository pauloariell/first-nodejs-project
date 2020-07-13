import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


//SoC: Separetion of Concerns (Separação de preocupações);
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, respose) => {
  try {
    const { provider, date } = request.body;
    const parseDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );
    const appointment = createAppointmentService.execute({
      provider,
      date: parseDate,
    });
    return respose.json(appointment);
  } catch (err) {
    return respose
      .status(400)
      .json({ error: err.message });
  }
});

export default appointmentsRouter;
