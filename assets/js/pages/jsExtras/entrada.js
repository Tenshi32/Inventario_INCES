document.addEventListener('DOMContentLoaded', function () {
  const tableBody = document.getElementById('tablaEquipos');
  const buscador = document.getElementById('buscadorEquipo');
  const filtroEstado = document.getElementById('filtroEstadoEquipo');
  const btnGuardar = document.getElementById('btnGuardarEquipo');
  const formEquipo = document.getElementById('formEquipo');

  const fields = {
    equipoId: document.getElementById('equipoId'),
    tipoEquipo: document.getElementById('tipoEquipo'),
    codigoBienes: document.getElementById('codigoBienes'),
    features: document.getElementById('features'),
    marca: document.getElementById('marca'),
    modelo: document.getElementById('modelo'),
    serial: document.getElementById('serial'),
    fechaCompra: document.getElementById('fechaCompra'),
    ubicacionEquipo: document.getElementById('ubicacionEquipo'),
    responsable: document.getElementById('responsable'),
    descripcionEquipo: document.getElementById('descripcionEquipo'),
    estadoEquipo: document.getElementById('estadoEquipo')
  };

  let equipos = [
    {
      id: 'EQ-0001',
      tipo: 'Computadora',
      codigoBienes: 'BN-0001',
      features: ['SSD','8GB RAM'],
      marca: 'Dell',
      modelo: 'OptiPlex 7090',
      serial: '1234-5678',
      ubicacion: 'Oficina Central',
      estado: 'Nuevo'
    }
  ];

  function renderEquipos() {
    const query = buscador.value.trim().toLowerCase();
    const estadoFilter = filtroEstado.value;
    tableBody.innerHTML = '';

    equipos
      .filter(equipo => {
        const text = `${equipo.id} ${equipo.tipo} ${equipo.marca} ${equipo.modelo} ${equipo.features ? equipo.features.join(' ') : ''} ${equipo.codigoBienes || ''} ${equipo.serial} ${equipo.ubicacion} ${equipo.estado}`.toLowerCase();
        const matchSearch = text.includes(query);
        const matchEstado = estadoFilter === 'all' || equipo.estado.toLowerCase() === estadoFilter;
        return matchSearch && matchEstado;
      })
      .forEach(equipo => {
        const row = document.createElement('tr');
        const featuresHtml = (equipo.features || []).map(f => `<span class="badge bg-label-info me-1">${f}</span>`).join('');
        row.innerHTML = `
          <td><strong>${equipo.id}</strong></td>
          <td>${equipo.tipo}</td>
          <td>${equipo.marca}</td>
          <td>${equipo.modelo}</td>
          <td>${featuresHtml}</td>
          <td>${equipo.codigoBienes || ''}</td>
          <td>${equipo.serial}</td>
          <td>${equipo.ubicacion}</td>
          <td><span class="badge ${equipo.estado === 'Nuevo' ? 'bg-label-success' : equipo.estado === 'Activo' ? 'bg-label-primary' : 'bg-label-warning'}">${equipo.estado}</span></td>
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
    formEquipo.reset();
    fields.equipoId.value = `EQ-${String(equipos.length + 1).padStart(4, '0')}`;
    fields.tipoEquipo.value = 'computadora';
    fields.estadoEquipo.value = 'nuevo';
    fields.codigoBienes.value = '';
    if (fields.features) {
      Array.from(fields.features.options).forEach(o => o.selected = false);
    }
  }

  btnGuardar.addEventListener('click', function () {
    if (!fields.codigoBienes.value.trim()) {
      alert('El Código de Bienes Nacionales es obligatorio.');
      fields.codigoBienes.focus();
      return;
    }
    const selectedFeatures = fields.features ? Array.from(fields.features.selectedOptions).map(o => o.value) : [];
    const newEquipo = {
      id: fields.equipoId.value || `EQ-${String(equipos.length + 1).padStart(4, '0')}`,
      tipo: fields.tipoEquipo.value.charAt(0).toUpperCase() + fields.tipoEquipo.value.slice(1),
      codigoBienes: fields.codigoBienes.value.trim(),
      features: selectedFeatures,
      marca: fields.marca.value.trim() || 'Sin marca',
      modelo: fields.modelo.value.trim() || 'Sin modelo',
      serial: fields.serial.value.trim() || 'No especificado',
      ubicacion: fields.ubicacionEquipo.value.trim() || 'No especificado',
      estado: fields.estadoEquipo.value.charAt(0).toUpperCase() + fields.estadoEquipo.value.slice(1)
    };

    equipos.unshift(newEquipo);
    renderEquipos();
    resetForm();
    const modal = bootstrap.Modal.getInstance(document.getElementById('equipoModal'));
    if (modal) modal.hide();
  });

  buscador.addEventListener('input', renderEquipos);
  filtroEstado.addEventListener('change', renderEquipos);

  // Forzar mayúsculas en campos clave
  ['marca','modelo','serial','codigoBienes','ubicacionEquipo','responsable'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        el.value = el.value.toUpperCase();
      });
    }
  });

  resetForm();
  renderEquipos();
});
