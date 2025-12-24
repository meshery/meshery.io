/**
 * Filter UI rendering components
 */

export function createCategoryCheckbox(category, count, onCheck) {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = 'type';
  input.value = category;
  input.id = category;
  input.onclick = onCheck;

  const label = document.createElement('label');
  label.innerHTML = `<div class="name">${category.replace(/-/g, ' ')}</div><div class="badge">${count}</div>`;
  label.style.height = '20px';
  label.setAttribute('for', category);

  inputContainer.appendChild(input);
  inputContainer.appendChild(label);

  return inputContainer;
}

export function createTechnologyCheckbox(techData, count, onCheck) {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.name = techData.name;
  input.value = techData.name;
  input.id = techData.name;
  input.onclick = onCheck;

  const label = document.createElement('label');
  const colorImg = '/' + techData.color.split('/').slice(1).join('/');
  const whiteImg = '/' + (techData.white || techData.color).split('/').slice(1).join('/');
  label.innerHTML = `<img src="${colorImg}" id="logo-dark-light" data-logo-for-dark="${whiteImg}" data-logo-for-light="${colorImg}" /><div class="name">${techData.name.replace(/-/g, ' ')}</div><div class="badge">${count}</div>`;
  label.style.height = '20px';
  label.setAttribute('for', techData.name);

  inputContainer.appendChild(input);
  inputContainer.appendChild(label);

  return inputContainer;
}

