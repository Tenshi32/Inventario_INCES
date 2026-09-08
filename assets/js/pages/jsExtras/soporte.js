document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('tablaSoporte');
  const buscador = document.getElementById('buscadorSoporte');
  const filtroEstado = document.getElementById('filtroEstado');
  const btnGuardar = document.getElementById('btnGuardarSoporte');
  const formSoporte = document.getElementById('formSoporte');

  const fields = {
    ticketId: document.getElementById('ticketId'),
    tipoSolicitud: document.getElementById('tipoSolicitud'),
    prioridad: document.getElementById('prioridad'),
    solicitante: document.getElementById('solicitante'),
    area: document.getElementById('area'),
    fechaReporte: document.getElementById('fechaReporte'),
    descripcionSoporte: document.getElementById('descripcionSoporte'),
    observaciones: document.getElementById('observaciones'),
    estado: document.getElementById('estado')
  };

  let tickets = [
    {
      ticket: 'TK-0001',
      solicitante: 'María López',
      area: 'Infraestructura',
      tipo: 'Soporte',
      prioridad: 'Media',
      estado: 'Abierto',
      fecha: '2026-06-03'
    }
  ];

  function renderTickets() {
    const query = buscador.value.trim().toLowerCase();
    const estadoFilter = filtroEstado.value;
    tableBody.innerHTML = '';

    tickets
      .filter(ticket => {
        const matchSearch = [ticket.ticket, ticket.solicitante, ticket.area, ticket.tipo, ticket.prioridad, ticket.estado, ticket.fecha]
          .some(value => value.toLowerCase().includes(query));
        const matchEstado = estadoFilter === 'all' || ticket.estado.toLowerCase().replace(' ', '_') === estadoFilter;
        return matchSearch && matchEstado;
      })
      .forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><strong>${ticket.ticket}</strong></td>
          <td>${ticket.solicitante}</td>
          <td>${ticket.area}</td>
          <td><span class="badge ${ticket.tipo === 'Mantenimiento' ? 'bg-label-secondary' : 'bg-label-info'}">${ticket.tipo}</span></td>
          <td><span class="badge ${ticket.prioridad === 'Alta' ? 'bg-label-danger' : ticket.prioridad === 'Media' ? 'bg-label-warning' : 'bg-label-success'}">${ticket.prioridad}</span></td>
          <td><span class="badge ${ticket.estado === 'Abierto' ? 'bg-label-success' : ticket.estado === 'En proceso' ? 'bg-label-warning' : 'bg-label-secondary'}">${ticket.estado}</span></td>
          <td>${ticket.fecha}</td>
          <td class="text-center">
            <div class="dropdown">
              <button type="button" class="btn btn-sm btn-icon p-0" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bx bx-dots-vertical-rounded"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Editar</a></li>
                <li><a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Eliminar</a></li>
              </ul>
            </div>
          </td>
        `;
        tableBody.appendChild(row);
      });
  }

  function resetForm() {
    formSoporte.reset();
    fields.ticketId.value = `TK-${String(tickets.length + 1).padStart(4, '0')}`;
    fields.tipoSolicitud.value = 'soporte';
    fields.prioridad.value = 'media';
    fields.estado.value = 'abierto';
  }

  btnGuardar.addEventListener('click', function () {
    const newTicket = {
      ticket: fields.ticketId.value || `TK-${String(tickets.length + 1).padStart(4, '0')}`,
      solicitante: fields.solicitante.value.trim() || 'Sin nombre',
      area: fields.area.value.trim() || 'No especificado',
      tipo: fields.tipoSolicitud.value === 'mantenimiento' ? 'Mantenimiento' : 'Soporte',
      prioridad: fields.prioridad.value.charAt(0).toUpperCase() + fields.prioridad.value.slice(1),
      estado: fields.estado.value === 'en_proceso' ? 'En proceso' : fields.estado.value.charAt(0).toUpperCase() + fields.estado.value.slice(1),
      fecha: fields.fechaReporte.value || new Date().toISOString().slice(0, 10)
    };

    tickets.unshift(newTicket);
    renderTickets();
    resetForm();
    const modal = bootstrap.Modal.getInstance(document.getElementById('soporteModal'));
    if (modal) modal.hide();
  });

  buscador.addEventListener('input', renderTickets);
  filtroEstado.addEventListener('change', renderTickets);

  resetForm();
  renderTickets();
});
