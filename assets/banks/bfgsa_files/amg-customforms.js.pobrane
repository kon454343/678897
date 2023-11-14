/* ---------------------------------------------------------------------------------------
 amg-customforms
 --------------------------------------------------------------------------------------- */

/*
 *AMG.CustomForms - gracefully degrading custom forms
 *odpowiada za podmiane elementow formularzy wybranymi grafikami, z zalozeniem ze strona ma dzialac po wylaczeniu javascript'u
 *ver: 0.3
 *
 * 0.3 	-	skrypt zoptymalizowany, dodana klawiaturowa obsluga zastepowanych elementow
 *
 *
 ****************
 *	AMG.CustomForms.replaceCheckboxes - zamienia input type="checkbox" i input typr="radio"
 *
 *@param	elements	elementy do zastapienia, wybrane za pomoca $$ albo $
 *@param	settings{
 *	className			klasa jaka zostanie nadana zastapionym elementom (pomaga w uzyskaniu elementow tego samego typu o roznym wygladzie na jednej stronie) || 'amg-checkbox'
 *	display			typ wyswietlania ('inline' (elementy rzedzie) lub 'list')(elementy w kolumnie) , ten sam efekt mozna uzyskac za pomoc css'a || inline
 *	checkboxWidth		szerokosc elementow checkbox/radio || 16
 *	checkboxHeight		wysokosc elementow (a nie samego obrazka)  || 16
 *	onChange:function(sourceElement, el)		funkcja callback wykonywana po zmianie stanu elementu - po wybraniu elementu z listy.
 *						sourceElement - element <input>
 *						el - wybierany element <label>
 *	}
 *
 *
 ****************
 *	AMG.CustomForms.replaceSelects - zamienia elementy select
 *
 *@param	elements	elementy do zastapienia, wybrane za pomoca $$ albo $
 *@param	settings{
 *	width				szerokosc utworzonego dropdowna || domyslnie: szerokosc pobierana z elementu select, z ktorego tworzony jest dropdown
 *	wrapperClass		nazwa klasy elementu ktory zawiera cala strukture || 'amg-selectbox-wrapper'
 *	containerClass		nazwa klasy elementu zawierajacego liste UL z wszystkimi elementami LI || 'amg-selectbox-container'
 *	inputClass			klasa elementu aktywnego, ktory rozwija liste jezeli na nigo kliknieto || 'amg-selectbox-clickable';
 *	hoverClass			klasa elementu podswietlonego || 'amg-selectbox-hovered-option';
 *	currentClass		klasa elementu wybranego  || 'amg-selectbox-selected-option'
 *	debug				tryb debugowania || false
 *	onChange:function(sourceElement, el)		funkcja callback wykonywana po zmianie stanu elementu - po wybraniu elementu z listy.
 *						sourceElement - element <select>
 *						el - element <div id="..._wrapper">
 *	}
 */

var accountBalance;
var balanceTimeout;
var AMG;
if (typeof AMG == "undefined")
	AMG = {};
if (typeof AMG.CustomForms == "undefined") {

	AMG.CustomForms = {

		ie6 : (navigator.appVersion.indexOf('MSIE 6.') == -1) ? false : true,
		ie7 : (navigator.appVersion.indexOf('MSIE 7.') == -1) ? false : true,
		ie8 : (navigator.appVersion.indexOf('MSIE 8.') == -1) ? false : true,
		ie9 : (navigator.appVersion.indexOf('MSIE 9.') == -1) ? false : true,
		observers : {},
		sourceElements : {},
		newElements : {},
		IE : Prototype.Browser.IE,

		// zastepuje wszystkie checkboxy i radiobuttons wybrane selektorem &&
		// lub $
		replaceCheckboxes : function(elements, settings) {

			if (!elements)
				return;

			var self = this;
			var elements = elements;

			// jezeli uzyto selektora $, to przeksztalcany na $$ zeby zadzialalo
			// each
			if (elements.id) {
				elements = $$('#' + elements.id);
			}
			// jak nie ma opcji to ustawia te
			var opt = settings || {};
			opt.className = opt.className || self.Namespace.checkboxPrefix
					+ '-checkbox';
			opt.display = opt.display || 'inline';
			opt.checkboxWidth = opt.checkboxWidth || 13;
			opt.checkboxHeight = opt.checkboxHeight || 13;

			var onChangeSet;
			(opt.onChange) ? onChangeSet = true : onChangeSet = false;

			this.replaceCheckboxes.eachF = elements
					.each(function(el, index) {
						if (el.type == "radio" || el.type == "checkbox") {
							// znajdz label odpowiadajacy elementowi
							var label;
							var elemId = el.id;

							if (onChangeSet) {
								opt.onChange = opt.onChange
							} else if (el.getAttribute('onclick') != null) {
								// w IE8 readAttribute nie zadziala poprawnie!!!
								opt.onChange = el.getAttribute('onclick');
							} else {
								opt.onChange = function() {
								};
							}

							// ustawienie dla inputa onclick="return false;"
							el.setAttribute('onclick', 'return false');

							// el.up() naprawia brak wsparcia dla selektora
							// label[for=xxx] w ie8, zadziala tylko pod
							// warunkiem zagniezdzenia inputa w label'u
							label = $$('label[for=' + el.id + ']')[0]
									|| el.up();

							label.writeAttribute({
								'id' : self.Namespace.checkboxClass + '-label-'
										+ elemId
							});
							var labelId = label.id;

							self.sourceElements[elemId] = {};
							self.sourceElements[elemId].el = el;
							self.sourceElements[elemId].newElement = label;
							self.sourceElements[elemId].newElementId = labelId;
							self.sourceElements[elemId].onChange = opt.onChange;
							// self.sourceElements[elemId].options = opt;

							self.newElements[labelId] = {};
							self.newElements[labelId].el = label;
							self.newElements[labelId].sourceElement = el;
							self.newElements[labelId].sourceElementId = elemId;
							self.newElements[labelId].onChange = opt.onChange;

							// dodaje klasy
							label.addClassName(opt.className + ' '
									+ self.Namespace.checkboxPrefix + '-'
									+ el.type + ' ' + opt.display);
							/*
							 * safari wybieral za duzo elementow i wstawial po
							 * kilka razy amg-checkbox-wrapper
							 */
							if (Prototype.Browser.WebKit
									&& label.down('span.'
											+ self.Namespace.checkboxClass
											+ '-wrapper'))
								return;

							// do labela dodaje kontener z checkboxem i ustawia
							// jego wymiary
							label
									.insert({
										'top' : new Template(
												'<span class="'
														+ self.Namespace.checkboxClass
														+ '-wrapper" style="width:#{width};height:#{height}"><span class="'
														+ self.Namespace.checkboxClass
														+ '-holder" style="width:#{holderWidth};height:#{height};"></span></span>')
												.evaluate({
													width : opt.checkboxWidth
															+ 'px',
													height : opt.checkboxHeight
															+ 'px',
													holderWidth : opt.checkboxWidth
															+ 'px'
												})
									});

							if (el.disabled) {
								if (el.checked) {
									label
											.addClassName(self.Namespace.checkboxClass
													+ '-disabled-checked');
								} else {
									label
											.addClassName(self.Namespace.checkboxClass
													+ '-disabled-not-checked');
								}
								el.addClassName(self.Namespace.checkboxClass
										+ '-hidden');
								return;
							}

							// jezeli ktorys z pierwotnych checkboxow byl
							// zaznaczony to nowy tez zaznacz
							if (el.checked) {
								label.addClassName(self.Namespace.checkboxClass
										+ '-checked');
								self.replaceCheckboxes.selected = el;
							} else if (!el.checked) {
								label.addClassName(self.Namespace.checkboxClass
										+ '-not-checked');
							}
							;

							var linkIdx = 0;
							var link = label.down('a', linkIdx);
							while (link != undefined) {

								if (link && !link.hasClassName('button-link')) {
									var linkId = (link.id != '') ? link.id : link
										.identify();
									self.observers[linkId] = {};
									self.observers[linkId].click = linkOnClick
										.bindAsEventListener(link, link);
									Event.observe(link, 'click',
										self.observers[linkId].click);
								}
								linkIdx += 1;
								link = label.down('a', linkIdx);
							}

							// ukrywa elementy
							el.addClassName(self.Namespace.checkboxClass
									+ '-hidden');

							self.observers[labelId] = {};
							self.observers[el.id] = {};

							self.observers[labelId].click = checkboxOnClick
									.bindAsEventListener(label, labelId);
							self.observers[el.id].focus = checkboxOnFocus
									.bindAsEventListener(el, label);
							self.observers[el.id].blur = checkboxOnBlur
									.bindAsEventListener(el, label);

							// dodaje eventy
							Event.observe(label, 'click',
									self.observers[labelId].click);
							Event.observe(el, 'focus',
									self.observers[el.id].focus);
							Event.observe(el, 'blur',
									self.observers[el.id].blur);

						}
					});

			function checkboxOnFocus(event, label) {
				// var el = Event.element(event);
				label.addClassName(self.Namespace.checkboxClass + '-focused');
			}
			;

			function checkboxOnBlur(event, label) {
				// var el = Event.element(event);
				label
						.removeClassName(self.Namespace.checkboxClass
								+ '-focused');
			}
			;

			function linkOnClick(event, link) {
				Event.stop(event);
				if (link.target = "_blank") {
					window.open(link.href, "");
				} else {
					top.location.href = link.href;
				}
			}

			function checkboxOnClick(event) {

				var element = this;
				var input = AMG.CustomForms.newElements[element.id].sourceElement;
				var onChange = AMG.CustomForms.newElements[element.id].onChange;

				/* jezeli disabled to nie klikamy */
				if (input.disabled)
					return;
				input.focus();

				var radioWasChecked = false;

				// wykonaj tylko jesli jest onclick na label
				if (Event.element(event) != input) {
					if (input.type == 'radio') {
						/*
						 * sprawdza czy radio juz zaznaczony i jezeli tak, to
						 * pozniej nie wywoluje onChange
						 */
						radioWasChecked = element
								.hasClassName(AMG.CustomForms.Namespace.checkboxClass
										+ '-checked');
						// odznacza pozostale radiobuttony o tej samej nazwie
						// (name attribute)
						elements
								.each(function(el) {
									if (el.type == 'radio'
											&& el.name == input.name) {
										var label = AMG.CustomForms.sourceElements[el.id].newElement;
										el.checked = false;
										if (label) {
											label
													.removeClassName(AMG.CustomForms.Namespace.checkboxClass
															+ '-checked');
											label
													.addClassName(AMG.CustomForms.Namespace.checkboxClass
															+ '-not-checked');
										}
									}
								});
					}
					;

					// zaznacza wybrany element
					element
							.toggleClassName(AMG.CustomForms.Namespace.checkboxClass
									+ '-checked');
					element
							.toggleClassName(AMG.CustomForms.Namespace.checkboxClass
									+ '-not-checked');
					if (input.checked == false) {
						input.checked = true;
					} else {
						input.checked = false;
					}
					Event.stop(event);
					if (!radioWasChecked) {
						if (Object.isFunction(onChange)) {
							onChange(input, element);
						} else {
							eval(onChange);
						}
					}
				}
			}
			;
		},

		// zastepuje wszystkie elemnty select wybrane selektorem && lub $
		replaceSelects : function(elements, settings) {

			if (!elements)
				return;

			var self = this;
			// var currentSelectedOption = null;

			// zmienna publiczna zwraca odwolanie do obecnie zaznaczonego
			// elementu
			this.replaceSelects.selected = {};

			// jezeli uzyto selektora $, to przeksztalcany na $$ zeby zadzialalo
			// each
			if (elements.id) {
				elements = $$('#' + elements.id);
			}
			if (elements.length <= 0) {
				return;
			}

			for (var i = 0; i < elements.length; i++) {
				var el = elements[i];
				var index = i;

				if (el.nodeName == 'SELECT') {

					var opt = settings || {};
					opt.wrapperClass = opt.wrapperClass
							|| self.Namespace.selectboxClass + '-wrapper';
					opt.containerClass = opt.containerClass
							|| self.Namespace.selectboxClass + '-container';
					opt.inputClass = opt.inputClass
							|| self.Namespace.selectboxClass + '-clickable';
					opt.hoverClass = opt.hoverClass
							|| self.Namespace.selectboxClass
							+ '-hovered-option';
					opt.currentClass = opt.selectedClass
							|| self.Namespace.selectboxClass
							+ '-selected-option'
					opt.debug = opt.debug || false;
					opt.maxElements = opt.maxElements || 10;
					opt.onChange = el.getAttribute('onchange') || opt.onChange
							|| function() {
							};
					el.setAttribute('onchange', 'return false');
					opt.width = opt.width || null;
					opt.letterWidth = opt.letterWidth || 7;
					opt.checkMouseOut = opt.checkMouseOut || 1;

					// element select
					var sourceElement = el;
					var sourceElementId = (el.id != '') ? el.id : el.identify();

					// for opera
					var usedEnter = false;

					sourceElement
							.insert({
								'before' : new Template(
										'<div id="#{id}-selectbox-wrapper" class="#{wrapperClass}"><a id="#{id}-selectbox-clickbar" class="#{clickClass}" tabIndex="-1"></a><div id="#{id}-selectbox-container" class="#{containerClass}"></div></div>')
										.evaluate({
											id : sourceElementId,
											wrapperClass : opt.wrapperClass,
											clickClass : opt.inputClass,
											containerClass : opt.containerClass
										})
							});

					// element zawierajacy cala nowa strukture
					var wrapper = $(sourceElementId + '-selectbox-wrapper');
					;
					// element na ktory klikamy
					var clickBar = $(sourceElementId + '-selectbox-clickbar');
					// kontener z lista opcji
					var container = $(sourceElementId + '-selectbox-container');

					// index aktywnego (hovered) elementu
					container.active = -1;

					self.sourceElements[sourceElementId] = {};
					self.sourceElements[sourceElementId].el = el;
					self.sourceElements[sourceElementId].newElement = wrapper;
					self.sourceElements[sourceElementId].container = container;
					self.sourceElements[sourceElementId].clickBar = clickBar;
					self.sourceElements[sourceElementId].currentClass = opt.currentClass;
					self.sourceElements[sourceElementId].hoverClass = opt.hoverClass;
					self.sourceElements[sourceElementId].newElementId = wrapper.id;
					self.sourceElements[sourceElementId].newElementZindex = wrapper.style.zIndex;
					// jezeli juz istnieja to nie nadpisujemy
					self.sourceElements[sourceElementId].onChange = self.sourceElements[sourceElementId].onChange
							|| opt.onChange;
					self.sourceElements[sourceElementId].maxElements = self.sourceElements[sourceElementId].maxElements
							|| opt.maxElements;
					self.sourceElements[sourceElementId].longestElement = 0;
					self.sourceElements[sourceElementId].letterWidth = opt.letterWidth;
					self.sourceElements[sourceElementId].checkMouseOut = opt.checkMouseOut;

					self.newElements[wrapper.id] = {}
					self.newElements[wrapper.id].el = wrapper;
					self.newElements[wrapper.id].sourceElement = el;
					self.newElements[wrapper.id].sourceElementId = sourceElementId;

					// inicjalizacja listy opcji
					self.initContainer(opt, sourceElementId);

					// ukrywanie selecta poprzez wpisanie do diva z overflow
					// (naprawia bug scrollowania podczas lapania focusa przez
					// select)
					var hideDiv = new Element('div', {
						'class' : AMG.CustomForms.Namespace.selectboxClass
								+ '-hidden-wrapper'
					});
					sourceElement
							.addClassName(AMG.CustomForms.Namespace.selectboxClass
									+ '-hidden');
					wrapper.insert({
						'after' : hideDiv
					});
					hideDiv.insert(sourceElement);

					if (sourceElement.disabled) {
						wrapper.addClassName(self.Namespace.selectboxClass
								+ '-disabled-not-checked');
					}

					if (sourceElement.hasClassName('hidden')) {
						wrapper.addClassName('hidden');
					}

					if (sourceElement.hasClassName('error')) {
						clickBar.addClassName('error');
					}

					// observers
					self.observers[sourceElementId] = new Object();
					self.observers[clickBar.id] = new Object();
					self.observers[wrapper.id] = new Object();
					self.observers[sourceElementId].keydown = self.selectOnKeydown
							.bindAsEventListener(sourceElement,
									sourceElementId, container);
					self.observers[sourceElementId].focus = self.selectOnFocus
							.bindAsEventListener(sourceElement, clickBar);
					self.observers[sourceElementId].blur = self.selectOnBlur
							.bindAsEventListener(sourceElement, clickBar);
					self.observers[clickBar.id].click = self.clickBarOnClick
							.bindAsEventListener(sourceElement, sourceElement);
					if (opt.checkMouseOut == 1) {
						self.observers[wrapper.id].mouseout = self.containerMouseOut
								.bindAsEventListener(wrapper, wrapper.id,
										sourceElementId);
					}
					Event.observe(sourceElement, 'keydown',
							AMG.CustomForms.observers[sourceElementId].keydown);
					Event.observe(sourceElement, 'focus',
							AMG.CustomForms.observers[sourceElementId].focus);
					Event.observe(sourceElement, 'blur',
							AMG.CustomForms.observers[sourceElementId].blur);

					if (Prototype.Browser.Opera)
						$(sourceElement).writeAttribute({
							'onchange' : ''
						});

					Event.observe(clickBar, 'click',
							AMG.CustomForms.observers[clickBar.id].click);
					if (opt.checkMouseOut == 1) {
						Event.observe(wrapper, 'mouseout',
								AMG.CustomForms.observers[wrapper.id].mouseout);
					}
				}
			}
			// });
		},

		// dodaje, odejmuje z klasy css danego Selecta klase error
		swapErrorSelectClassName : function(elements) {

			if (!elements)
				return;

			// jezeli uzyto selektora $, to przeksztalcany na $$ zeby zadzialalo
			// each
			if (elements.id) {
				elements = $$('#' + elements.id);
			}

			if (elements.length <= 0) {
				return;
			}

			for (var i = 0; i < elements.length; i++) {
				var el = elements[i];

				if (el.nodeName == 'SELECT') {

					var sourceElement = el;
					var sourceElementId = el.id;
					var clickBar = $(sourceElementId + '-selectbox-clickbar');

					if (sourceElement.hasClassName('error')) {
						clickBar.addClassName('error');
					} else {
						clickBar.removeClassName('error');
					}

				}
			}
		},

		// tworzy do kontenera liste z opcjami i ustawia wymiary takie jak
		// select
		initContainer : function(options, sourceElId) {

			var self = AMG.CustomForms;
			var sourceElement = self.sourceElements[sourceElId].el;
			var container = self.sourceElements[sourceElId].container;
			var clickBar = self.sourceElements[sourceElId].clickBar;

			var width = options.width;
			if (width == null)
				width = sourceElement.offsetWidth;

			// -1 bo w css dodany jest border-left:1px
			clickBar.style.width = width - 1 + 'px';
			self.populateOptions(sourceElId, options);
			container.hide();
			if (self.ie6) {
				if (container.getDimensions().width < width) {
					container.style.width = width + 'px';
				} else {
					container.style.width = 'auto';
				}
			} else if (self.ie7 || Prototype.Browser.Opera || self.ie8) {
				if (self.sourceElements[sourceElId].longestElement > width) {
					container.style.width = self.sourceElements[sourceElId].longestElement
							+ 20 + 'px';
				} else {
					container.style.width = width + 'px';
				}
			} else {
				container.style.minWidth = width - 2 + 'px';
			}

		},

		// przepisuje list option do ul>li i ustawia na nich eventy
		populateOptions : function(parentId, options) {
			var self = AMG.CustomForms;
			var container = self.sourceElements[parentId].container;
			var select = self.sourceElements[parentId].el;
			var clickBar = self.sourceElements[parentId].clickBar;
			var maxElements = self.sourceElements[parentId].maxElements;

			var optionElements = select.childElements();
			var liElementId;

			var len = optionElements.length;
			var tmp = [];

			tmp[0] = '<ul>';
			for (var i = 1; i <= len; i += 1) {
				var optionEl = optionElements[i - 1];
				var index = i - 1;

				// dla elementu aktualnie wybranego
				var isSelected;
				(optionEl.selected) ? isSelected = true : isSelected = false;
				if (isSelected) {
					// currentSelectedOption = optionEl;
					self.sourceElements[parentId].selectedNum = index;
					self.setValue(clickBar, optionEl);
				}
				if (index == options.maxElements) {
					self.sourceElements[parentId].setMaxElements = true;
				}

				liElementId = parentId + '-option-' + index;
				tmp[i] = '<li id="'
						+ liElementId
						+ '" class="'
						+ (isSelected ? options.currentClass : '')
						+ '"><a onclick="return false;">'
						+ optionEl.text.replace(/</gi, '&lt;').replace(/>/gi,
								'&gt;') + '</a></li>';

			}
			tmp[tmp.length] = '</ul>';

			container.insert(tmp.join(''));

			// dodanie observerow do kazdego elementu li
			var lis = container.select('ul li');
			for (var i = 0; i < lis.length; i++) {
				var li = lis[i];
				var liElementId = li.id;

				if (self.ie7 || Prototype.Browser.Opera || self.ie8) {
					var liWidth = li.getWidth();
					if (liWidth > self.sourceElements[parentId].longestElement)
						self.sourceElements[parentId].longestElement = liWidth;
				}

				self.observers[liElementId] = {};
				self.observers[liElementId].click = self.selectLiOption
						.bindAsEventListener(li, parentId, i);
				Event.observe(li, 'click', self.observers[liElementId].click);
			}

			// ustawia maksymalna wysokosc listy
			if (maxElements && optionElements.length > maxElements) {
				var h = container.select('li a')[0].getHeight() || 14;
				if (h < 14)
					h = 14;
				container.setStyle({
					'height' : (maxElements * h) + 'px',
					'overflowY' : 'scroll',
					'overflowX' : 'hidden'
				});
			}
		},

		// wybranie opcji po kliknieciu, wybraniu enterem
		selectLiOption : function(el, sourceElementId, index) {

			var selectElement = AMG.CustomForms.sourceElements[sourceElementId].el;
			var container = AMG.CustomForms.sourceElements[sourceElementId].container;
			var newElement = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var clickBar = AMG.CustomForms.sourceElements[sourceElementId].clickBar;
			var currentClass = AMG.CustomForms.sourceElements[sourceElementId].currentClass;
			var hoverClass = AMG.CustomForms.sourceElements[sourceElementId].hoverClass;
			var onChange = AMG.CustomForms.sourceElements[sourceElementId].onChange;
			if (el.id == undefined)
				el = this;

			if (AMG.CustomForms.sourceElements[sourceElementId].selectedNum >= 0) {
				container.select('li.' + currentClass)[0]
						.removeClassName(currentClass);
			}

			// container.select('li.' +
			// hoverClass)[0].removeClassName(hoverClass);
			el.writeAttribute({
				'class' : false
			}).addClassName(currentClass);
			selectElement.selectedIndex = index;
			selectElement.value = selectElement.childElements()[index].value;
			selectElement.childElements()[index].selected = true;
			AMG.CustomForms.sourceElements[sourceElementId].selectedNum = index;

			// ustawienie wartosci pokazywanej w elemencie na ktory uzytkownik
			// klika
			AMG.CustomForms.setValue(clickBar, el.select('a')[0]);

			container.active = -1;
			AMG.CustomForms.hideDropdown(sourceElementId);
			if (Object.isFunction(onChange)) {
				onChange(selectElement, newElement);
			} else if (onChange != 'return false') {
				eval(onChange);
			}

		},

		// ukrywa dropdown o id==sourceElementId
		hideDropdown : function(sourceElementId) {
			var wrapper = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var container = AMG.CustomForms.sourceElements[sourceElementId].container;
			var wrapperZindex = AMG.CustomForms.sourceElements[sourceElementId].newElementZindex;
			wrapper.setStyle({
				'zIndex' : wrapperZindex
			});
			// zIndex problems in form rows
			var formRow = wrapper.up('div.form_row');
			if (formRow)
				formRow.removeClassName('autocompleter-row-before');
			container.hide();
			container.dropdownActive = false;
		},

		// pokazuje dropdown o id==sourceElementId
		showDropdown : function(sourceElementId) {
			var self = AMG.CustomForms;
			var wrapper = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var container = AMG.CustomForms.sourceElements[sourceElementId].container;
			var clickBar = AMG.CustomForms.sourceElements[sourceElementId].clickBar;
			var checkMouseOut = AMG.CustomForms.sourceElements[sourceElementId].checkMouseOut;
			if (container.dropdownActive)
				return;

			if (container.active != -1) {
				container.select('li')[container.active]
						.removeClassName(self.Namespace.selectboxClass
								+ '-hovered-option');
				container.active = -1;
			}
			if (container.style.display == 'none') {
				var cHeight = clickBar.getHeight() - 1;
				container.setStyle({
					'top' : cHeight + 'px'
				})
			}

			wrapper.setStyle({
				'zIndex' : '5000'
			});
			// zIndex problems in form rows
			var formRow = wrapper.up('div.form_row');
			if (formRow)
				formRow.addClassName('autocompleter-row-before');

			container.toggle();
			AMG.CustomForms.setPotition(container);

			container.dropdownActive = true;

			if (Prototype.Browser.Opera) {
				var form = $(sourceElementId).form;
				var formId = form.identify();
				AMG.CustomForms.observers[formId] = {};
				AMG.CustomForms.observers[formId].submit = AMG.CustomForms.stopSubmit
						.bindAsEventListener();
				form
						.observe('submit',
								AMG.CustomForms.observers[formId].submit);
			}

			var selectedLi = container
					.select('ul li.amg-selectbox-selected-option')[0];
			AMG.CustomForms.scrollToOption(selectedLi, container);
			if (checkMouseOut != 1) {
				Event.observe(document, "click", self.closeIfClickedOut
						.bindAsEventListener(this, sourceElementId));
			}
		},

		setPotition : function(container) {
			var containerHeight = container.offsetHeight;
			var below = ((containerHeight + container.viewportOffset().top) > document.viewport
					.getHeight()) ? true : false;
			if (Prototype.Browser.Opera) {
				below = ((containerHeight + container.cumulativeOffset().top - container
						.cumulativeScrollOffset().top) > document.viewport
						.getHeight()) ? true : false;
			}
			if (below)
				container.setStyle({
					'top' : '-' + containerHeight + 'px'
				});
		},

		// zwraca index zaznaczonego elementu
		getSelectedOption : function(id) {
			var selectEl = $(id);
			if (!selectEl)
				return (-1);
			return selectEl.selectedIndex;
		},

		closeIfClickedOut : function(e, sourceElementId) {
			var self = AMG.CustomForms;
			if (!$(Event.element(e)).descendantOf(
					self.sourceElements[sourceElementId].container)) {
				self.hideDropdown(sourceElementId);
			}
		},

		navigateOption : function(sourceElementId, step) {

			var self = AMG.CustomForms;
			var wrapper = self.sourceElements[sourceElementId].newElement;
			var container = self.sourceElements[sourceElementId].container;
			var hoverClass = self.sourceElements[sourceElementId].hoverClass;
			var lis = container.select('ul li');
			if (!lis)
				return false;

			if (container.active == -1) {
				container.active = parseInt(lis[0].up().select(
						'.' + self.Namespace.selectboxClass
								+ '-selected-option')[0].id.split('-option-')[1]);
			} else {
				container.active += step;
			}

			if (container.active < 0) {
				container.active = 0;
			} else if (container.active >= lis.length) {
				container.active = lis.length - 1;
			}

			// podmienia klase odpowiedzialana za hover
			lis.each(function(el, index) {
				el.removeClassName(hoverClass);
			});

			if (container.active != -1) {

				var activeLi = lis[container.active];
				activeLi.addClassName(hoverClass);

				var liHeight = activeLi.getHeight();
				var containerHeight = container.getHeight();

				var offsetTop = activeLi.positionedOffset().top;

				if (step == 1) {
					if (container.active < lis.length
							&& (offsetTop - container.scrollTop >= (containerHeight - liHeight))) {
						container.scrollTop += liHeight;
					}
				} else if (step == -1) {
					if (container.active > 0
							&& (offsetTop - container.scrollTop <= (0 - liHeight))) {
						container.scrollTop -= liHeight;
					}
				}
			}
		},

		scrollToOption : function(li, container) {
			if (li) {
				var offset = li.positionedOffset().top;
				if (Prototype.Browser.IE) {
					// todo: po keydown w IE przestawiany jest scrollTop nie
					// wiadomo w jaki sposob dlatego setTimeout
					setTimeout("$('" + container.id + "').scrollTop = "
							+ offset + ";", 20);
				} else {
					container.scrollTop = offset;
				}

			}
		},

		selectOnKeydown : function(event, sourceElementId, container) {

			// var el = Event.element(event);
			var self = AMG.CustomForms;

			switch (event.keyCode) {
			case 38: // up
				Event.stop(event);
				self.showDropdown(sourceElementId);
				self.navigateOption(sourceElementId, -1);
				break;
			case 40: // down
				Event.stop(event);
				self.showDropdown(sourceElementId);
				self.navigateOption(sourceElementId, 1);
				break;
			case 13: // return
				Event.stop(event);

				var liEl = container.select('.' + self.Namespace.selectboxClass
						+ '-hovered-option')[0]
				var ind = parseInt(liEl.id.split('-option-')[1]);
				if (container.dropdownActive)
					self.selectLiOption(liEl, sourceElementId, ind);
				break;
			case 9: // tab
				if (container.dropdownActive) {
					var liEl = container
							.select('.' + self.Namespace.selectboxClass
									+ '-hovered-option')[0]
					var ind = parseInt(liEl.id.split('-option-')[1]);
					self.selectLiOption(liEl, sourceElementId, ind);
				}
				break;
			case 27: // escape
				Event.stop(event);
				if (container.dropdownActive) {
					var liEl = container
							.select('.' + self.Namespace.selectboxClass
									+ '-hovered-option')[0]
					var ind = parseInt(liEl.id.split('-option-')[1]);
					self.selectLiOption(liEl, sourceElementId, ind);
				}
				break;
			default:
				Event.stop(event);
				var lis = container.select('ul li');
				var keychar = String.fromCharCode(event.keyCode).toLowerCase();
				for (var i = 0; i < lis.length; i++) {
					var firstChar = lis[i].select('a')[0].innerHTML.split('')[0]
							.toLowerCase();
					if (firstChar == keychar) {
						if (lis[container.active])
							lis[container.active]
									.removeClassName(self.Namespace.selectboxClass
											+ '-hovered-option');
						lis[i].addClassName(self.Namespace.selectboxClass
								+ '-hovered-option');
						self.scrollToOption(lis[i], container);
						container.active = i;
						break;
					}
				}
			}
		},

		selectOnFocus : function(event, clickBar) {
			var self = AMG.CustomForms;
			clickBar.addClassName(self.Namespace.selectboxClass
					+ '-clickable-focused');
		},

		selectOnBlur : function(event, clickBar) {
			var self = AMG.CustomForms;
			if (Prototype.Browser.Opera) {
				var el = Event.element(event);
				var form = el.form;
				var formId = form.identify();
				form.stopObserving('submit',
						AMG.CustomForms.observers[formId].submit);
				delete AMG.CustomForms.observers[formId];
			}
			clickBar.removeClassName(self.Namespace.selectboxClass
					+ '-clickable-focused');
		},

		clickBarOnClick : function(event, sourceElement) {
			if (sourceElement.disabled)
				return;
			sourceElement.focus();
			AMG.CustomForms.showDropdown(sourceElement.id);
			Event.stop(event);
		},

		// ustawia wartosc elementu '.amg-selectbox-clickable'
		setValue : function(linkEl, elToSelect) {
			var sourceElementId = linkEl.id.split('-selectbox-clickbar')[0];
			var linkLength = linkEl.offsetWidth - 17;
			var maxLength = Math
					.ceil(linkLength
							/ AMG.CustomForms.sourceElements[sourceElementId].letterWidth);
			var text = '';
			(elToSelect.text) ? text = elToSelect.text
					: text = elToSelect.innerHTML;
			text = text.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
			if (text.length > maxLength) {
				var value = text.substring(0, maxLength)
				value += '...';
			} else {
				value = text;
			}
			linkEl.innerHTML = value;
		},

		destroyObserver : function(elementId) {
			if (!$(elementId))
				return;
			var handler = this.observers[elementId];
			for ( var handlerType in handler) {
				if (handler[handlerType])
					Event.stopObserving(elementId, handlerType,
							handler[handlerType]);
			}
			delete this.observers[elementId];
		},

		// stopuje submit formularza (stosowane tylko w operze)
		stopSubmit : function(ev) {
			Event.stop(ev);
			return false;
		},

		containerMouseOut : function(event, containerId, sourceElementId) {
			/*
			 * okreslenie elementu nad ktorym znajduje sie myszka w momencie
			 * wywolania eventu
			 */
			// var relatedElement = Element.extend(event.relatedTarget ||
			// event.toElement);
			var relatedElement = event.relatedTarget || event.toElement;

			try {
				/*
				 * ustalenie czy element zawiera sie w portlecie, jezeli nie to
				 * znaczy ze zjechalismy z el
				 */
				// if(relatedElement && !relatedElement.up('div#' + containerId
				// )){
				if (relatedElement.className
						&& relatedElement.className.indexOf('amg-selectbox') == -1
						|| !relatedElement.up('div#' + containerId)) {
					AMG.CustomForms.hideDropdown(sourceElementId);
				}

			} catch (ex) {
				// bo relatedElement jest XULElement || xpconnect wrapped native
				// prototype -
				// http://www.yui-ext.com/forum/showthread.php?t=74765&page=9
				var container = AMG.CustomForms.sourceElements[sourceElementId].container;
				var pointerX = Event.pointerX(event);
				var pointerY = Event.pointerY(event);
				var maxX = container.cumulativeOffset().left
						+ container.getDimensions().width;
				var maxY = container.cumulativeOffset().top
						+ container.getDimensions().height;

				// console.log('x: ' + pointerX + ', ' + maxX);
				// console.log('y: ' + pointerY + ', ' + maxY);

				// jezeli jestesmy poza kontenerem, to zapewne najechalismy na
				// inputa albo textarea
				if (pointerX >= maxX || pointerY >= maxY) {
					AMG.CustomForms.hideDropdown(sourceElementId);
				}
			}
		},

		clear : function() {
			for ( var id in AMG.CustomForms.observers) {
				AMG.CustomForms.destroyObserver(id);
			}
			AMG.CustomForms.sourceElements = AMG.CustomForms.newElements = null;
			delete AMG.CustomForms.sourceElements;
			delete AMG.CustomForms.newElements;
		}
	}
};

// usuwanie observerow przed wyjsciem ze strony
Event.observe(window, 'beforeunload', function() {
	// AMG.CustomForms.clear();
});

// obiekt z prefixami nazw klas/id elementow (ewentualne zmiany wymagaja zmian w
// css-ie)
if (typeof AMG.CustomForms.Namespace == "undefined") {
	AMG.CustomForms.Namespace = {
		checkboxPrefix : 'amg',
		checkboxClass : 'amg-checkbox',
		selectboxClass : 'amg-selectbox'
	}
}

// pomocnicze metody do 'sterowania' graficznymi kontrolkami z zewnetrznych
// skryptow
if (typeof AMG.CustomForms.Controls == "undefined") {
	AMG.CustomForms.Controls = {
		// zaznacza/odznacza checkboxa o podanym id, w przypadku radiobuttona
		// odznacza tez wszystkie inne o tej samej nazwie co zaznaczany
		toggleCheckbox : function(sourceElementId, triggerOnChange) {
			// var checkboxInput =
			// AMG.CustomForms.sourceElements[sourceElementId];

			var input = AMG.CustomForms.sourceElements[sourceElementId].el;
			var element = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var onChange = AMG.CustomForms.sourceElements[sourceElementId].onChange;

			/* jezeli disabled to nie klikamy */
			if (input.disabled)
				return;

			var radioWasChecked = false;
			if (input.type == 'radio') {
				/*
				 * sprawdza czy radio juz zaznaczony i jezeli tak, to pozniej
				 * nie wywoluje onChange
				 */
				radioWasChecked = element
						.hasClassName(AMG.CustomForms.Namespace.checkboxClass
								+ '-checked');
				// odznacza pozostale radiobuttony o tej samej nazwie (name
				// attribute)
				var elements = $$('input[type=radio]');
				elements
						.each(function(el) {
							if (el.type == 'radio' && el.name == input.name) {

								var label = AMG.CustomForms.sourceElements[el.id].newElement;

								el.checked = false;
								if (label)
									label
											.removeClassName(
													AMG.CustomForms.Namespace.checkboxClass
															+ '-checked')
											.addClassName(
													AMG.CustomForms.Namespace.checkboxClass
															+ '-not-checked');
							}
						});
			}
			;

			// zaznacza wybrany element
			element.toggleClassName(AMG.CustomForms.Namespace.checkboxClass
					+ '-checked');
			element.toggleClassName(AMG.CustomForms.Namespace.checkboxClass
					+ '-not-checked');
			if (element != input) {
				if ((input.checked == false)) {
					input.checked = true;
				} else {
					input.checked = false;
				}
			}
			if (input.type == 'radio') {
				if (!radioWasChecked && triggerOnChange)
					onChange(input, element);
			} else {
				if (triggerOnChange)
					onChange(input, element);
			}
		},

		// zaznaczy wszystkie checkboxy (nie radiobuttony), jezeli deselect=true
		// to checkboxy zostana odznaczone
		selectAllCheckboxes : function(checkboxes, deselect) {
			checkboxes.each(function(el) {
				if (el.type == 'checkbox') {
					// odznaczanie
					if (deselect) {
						el.up().removeClassName(
								AMG.CustomForms.Namespace.checkboxClass
										+ '-checked').addClassName(
								AMG.CustomForms.Namespace.checkboxClass
										+ '-not-checked');
						el.checked = false;
					} else {
						// zaznaczanie
						el.up().addClassName(
								AMG.CustomForms.Namespace.checkboxClass
										+ '-checked').removeClassName(
								AMG.CustomForms.Namespace.checkboxClass
										+ '-not-checked');
						el.checked = true;
					}

					// TODO: do sprawdzenia, w ten sposob moze tylko zadzialac
					// dla list (tylko gdy onclick jest inline'owy)
					// console.log(AMG.CustomForms.sourceElements[el.id].onChange);

				}
			});
		},

		// zaznaczy opcje optIndex w select-cie o id==sourceElementId i wywola
		// onChange selecta jezeli triggerOnChange==true
		selectOption : function(sourceElementId, optIndex, triggerOnChange) {

			var selectElement = AMG.CustomForms.sourceElements[sourceElementId].el;
			var container = AMG.CustomForms.sourceElements[sourceElementId].container;
			var newElement = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var clickBar = AMG.CustomForms.sourceElements[sourceElementId].clickBar;
			var currentClass = AMG.CustomForms.sourceElements[sourceElementId].currentClass;
			var hoverClass = AMG.CustomForms.sourceElements[sourceElementId].hoverClass;
			var onChange = AMG.CustomForms.sourceElements[sourceElementId].onChange;

			var el = container.select('li')[optIndex];

			if (el.id == undefined)
				el = this;

			if (AMG.CustomForms.sourceElements[sourceElementId].selectedNum >= 0) {
				container.select('li.' + currentClass)[0]
						.removeClassName(currentClass);
			}

			el.writeAttribute({
				'class' : false
			}).addClassName(currentClass);
			selectElement.selectedIndex = optIndex;
			selectElement.childElements()[optIndex].selected = true;
			AMG.CustomForms.sourceElements[sourceElementId].selectedNum = optIndex;

			// ustawienie wartosci pokazywanej w elemencie na ktory uzytkownik
			// klika
			AMG.CustomForms.setValue(clickBar, el.select('a')[0]);

			container.active = -1;
			AMG.CustomForms.hideDropdown(sourceElementId);
			if (triggerOnChange)
				onChange(selectElement, newElement);
		},

		// removes only the custom select, leaves the source element
		removeSelect : function(sourceElementId) {

			var select = AMG.CustomForms.sourceElements[sourceElementId].el;
			var wrapper = $(sourceElementId + '-selectbox-wrapper');
			AMG.CustomForms.destroyObserver(sourceElementId);

			var hiddenWrapper = select.up();
			hiddenWrapper.insert({
				'after' : select
			});

			wrapper.remove();
			hiddenWrapper.remove();

			// TODO: ma usuwac czy zostawiac a pozniej nadpisac?
			// this.sourceElements[sourceElementId] = null;
			// delete this.sourceElements[sourceElementId];

			// this.newElements[sourceElementId + '-selectbox-wrapper'] = null;
			// delete this.newElements[sourceElementId + '-selectbox-wrapper'];

		},

		addOption : function(sourceElementId, text, value, selected) {

			var maxEl = AMG.CustomForms.sourceElements[sourceElementId].maxElements;
			var checkMO = AMG.CustomForms.sourceElements[sourceElementId].checkMouseOut;

			this.removeSelect(sourceElementId);

			var state = selected ? 'selected' : '';
			var select = $(sourceElementId);

			select.removeClassName(AMG.CustomForms.Namespace.selectboxClass
					+ '-hidden');

			var option = new Element('option', {
				value : value,
				selected : state
			}).update(text);

			select.insert(option);
			AMG.CustomForms.replaceSelects($(select.id), {
				maxElements : maxEl,
				checkMouseOut : checkMO
			});

		},

		removeOption : function(sourceElementId, optionIndex) {

			var select = AMG.CustomForms.sourceElements[sourceElementId].el;
			var container = AMG.CustomForms.sourceElements[sourceElementId].container;

			select.select('option')[optionIndex].remove();

			var li = container.select('li')[optionIndex];
			AMG.CustomForms.destroyObserver(li.id);
			li.remove();
		},

		clearOptions : function(sourceElementId) {
			var select = AMG.CustomForms.sourceElements[sourceElementId].el;
			var numElem = select.select('option').length;
			for (var i = 0; i < numElem; i++) {
				this.removeOption(sourceElementId, 0);
			}
		},

		setCheckboxState : function(sourceElementId, checked, disabled) {
			var input = AMG.CustomForms.sourceElements[sourceElementId].el;
			var element = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			input.disabled = disabled;
			input.checked = checked;

			element.removeClassName(AMG.CustomForms.Namespace.checkboxClass
					+ '-checked');
			element.removeClassName(AMG.CustomForms.Namespace.checkboxClass
					+ '-not-checked');
			element.removeClassName(AMG.CustomForms.Namespace.checkboxClass
					+ '-disabled-not-checked');
			element.removeClassName(AMG.CustomForms.Namespace.checkboxClass
					+ '-disabled-checked');

			element.addClassName(AMG.CustomForms.Namespace.checkboxClass
					+ ((disabled) ? '-disabled' : '')
					+ ((checked) ? '-checked' : '-not-checked'));
			if (input.type == 'radio' && checked) {
				var radios = $$('input[type=radio][name=' + input.name + ']');
				radios
						.each(function(el) {
							if (el.type == 'radio' && el.name == input.name) {
								var label = AMG.CustomForms.sourceElements[el.id].newElement;
								if (el != input) {
									el.checked = false;
									if (label != null) {

										label
												.removeClassName(AMG.CustomForms.Namespace.checkboxClass
														+ '-checked');
										label
												.removeClassName(AMG.CustomForms.Namespace.checkboxClass
														+ '-not-checked');
									}
								}
							}
						});
			}
		},

		setSelectState : function(sourceElementId, selectedValue, disabled) {
			var select = AMG.CustomForms.sourceElements[sourceElementId].el;
			var element = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var clickBar = AMG.CustomForms.sourceElements[sourceElementId].clickBar;

			select.disabled = disabled;
			select.value = selectedValue;

			if (select.selectedIndex >= 0) {
				AMG.CustomForms.setValue(clickBar,
						select.options[select.selectedIndex]);
			}

			element.removeClassName(AMG.CustomForms.Namespace.selectboxClass
					+ '-checked');
			element.removeClassName(AMG.CustomForms.Namespace.selectboxClass
					+ '-not-checked');
			element.removeClassName(AMG.CustomForms.Namespace.selectboxClass
					+ '-disabled-not-checked');
			element.removeClassName(AMG.CustomForms.Namespace.selectboxClass
					+ '-disabled-checked');

			element.addClassName(AMG.CustomForms.Namespace.selectboxClass
					+ ((disabled) ? '-disabled-not-checked' : ''));

		},

		selectCheckboxAndClick : function(sourceElementId, deselect) {
			var input = AMG.CustomForms.sourceElements[sourceElementId].el;
			var element = AMG.CustomForms.sourceElements[sourceElementId].newElement;
			var onChange = AMG.CustomForms.sourceElements[sourceElementId].onChange;
			/* jezeli disabled to nie klikamy */
			if (input.disabled)
				return;
			input.focus();
			if (deselect) {
				element.removeClassName(
						AMG.CustomForms.Namespace.checkboxClass + '-checked')
						.addClassName(
								AMG.CustomForms.Namespace.checkboxClass
										+ '-not-checked');
				input.checked = false;
			} else {
				element.addClassName(
						AMG.CustomForms.Namespace.checkboxClass + '-checked')
						.removeClassName(
								AMG.CustomForms.Namespace.checkboxClass
										+ '-not-checked');
				input.checked = true;
			}
			if (Object.isFunction(onChange)) {
				onChange(input, element);
			} else {
				eval(onChange);
			}

		}
	}
}

/* PBSSBESUP-1555 
if (document.addEventListener) {
	document.addEventListener("click", hideElement, false);
} else if (document.attachEvent) {
	document.attachEvent('onclick', hideElement);
}

function hideElement() {
	if (document.getElementById('order-cntrFullName-results')) {
		document.getElementById('order-cntrFullName-results').style.display = 'none';
	}
	if (document.getElementById('order-cntrGroupName-results')) {
		document.getElementById('order-cntrGroupName-results').style.display = 'none';
	}
	if (document.getElementById('order-cntrAccountNo-results')) {
		document.getElementById('order-cntrAccountNo-results').style.display = 'none';
	}
	if (document.getElementById('templateName-results')) {
		document.getElementById('templateName-results').style.display = 'none';
	}
	if (document.getElementById('order-zusPayerGroupName-results')) {
		document.getElementById('order-zusPayerGroupName-results').style.display = 'none';
	}
	if (document.getElementById('orderZusData-zusPayerName-results')) {
		document.getElementById('orderZusData-zusPayerName-results').style.display = 'none';
	}
	if (document.getElementById('order-taxPayerGroupName-results')) {
		document.getElementById('order-taxPayerGroupName-results').style.display = 'none';
	}
	if (document.getElementById('orderTaxData-taxPayerName-results')) {
		document.getElementById('orderTaxData-taxPayerName-results').style.display = 'none';
	}
	if (document.getElementById('orderTemplate-cntrFullName-results')) {
		document.getElementById('orderTemplate-cntrFullName-results').style.display = 'none';
	}
}*/

var iban;

function respondToClick(event) {
	var mask = {
		format : '## #### #### #### #### #### ####',
		regex : /^[0-9]+$/
	};
	var klawisz = window.event ? window.event.keyCode : event ? event.which : 0;

	if (event.ctrlKey && (event.which == 86 || event.which == 118)) {
		window.clipboardData.getData('Text');
		Event.stop(event);
	}

	if ((klawisz >= 32 && klawisz < 127)) {
		var ch = String.fromCharCode(klawisz);
		var str = this.value + ch;
		var pos = str.length;
		if (mask.regex.test(ch) && pos <= mask.format.length) {
			if (mask.format.charAt(pos - 1) != '#') {
				str = this.value + mask.format.charAt(pos - 1) + ch;
			}
			this.value = str;
		}
		Event.stop(event);
	}
}

function respondToClickForeign(event) {

    var mask = {
        format : '## #### #### #### #### #### ####',
        regex : /^[0-9]+$/
    };
    var maskIban = {
        format : '#### #### #### #### #### #### #### ###',
        regex : /^[a-zA-Z0-9]+$/
    };
    var klawisz = window.event ? window.event.keyCode : event ? event.which : 0;

    if (klawisz == 8 || klawisz == 46) {
        return;
    }

    if (this.value.length == 0) {
        if (klawisz >= 65 && klawisz <= 122) {
            iban = 'iban';
        } else if ((klawisz >= 32 && klawisz < 65)
            || (klawisz >= 123 && klawisz < 127)) {
            iban = 'nrb';
        }
    }

    if (event.ctrlKey && (event.which == 86 || event.which == 118)) {
        window.clipboardData.getData('Text');
        Event.stop(event);
    }

    if (klawisz >= 65 && klawisz <= 122) {
        if (iban == 'iban') {
            var ch = String.fromCharCode(klawisz).toUpperCase();
            var str = this.value + ch;
            var pos = str.length;
            if (maskIban.regex.test(ch) && pos <= maskIban.format.length) {
                if (maskIban.format.charAt(pos - 1) != '#') {
                    str = this.value + maskIban.format.charAt(pos - 1) + ch;
                }
                this.value = str;
            }
        }
        Event.stop(event);
    }

    if ((klawisz >= 32 && klawisz < 65) || (klawisz >= 123 && klawisz < 127)) {
        var ch = String.fromCharCode(klawisz);
        var str = this.value + ch;
        var pos = str.length;
        if (iban == 'nrb') {
            if (mask.regex.test(ch) && pos <= mask.format.length) {
                if (mask.format.charAt(pos - 1) != '#') {
                    str = this.value + mask.format.charAt(pos - 1) + ch;
                }
                this.value = str;
            }
        } else if (iban == 'iban') {
            if (maskIban.regex.test(ch) && pos <= maskIban.format.length) {
                if (maskIban.format.charAt(pos - 1) != '#') {
                    str = this.value + maskIban.format.charAt(pos - 1) + ch;
                }
                this.value = str;
            }
        }
        Event.stop(event);
    }
    Event.stop(event);
}

function messagePasteNrb(message) {
	d = document;
    if(d.getElementById("messagePasteNrb")) return;
    d.getElementById("page-cover").style.display = "block";
    alertObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    alertObj.id = "messagePasteNrb";
    if(d.all && !window.opera) alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.visiblity="visible";
    var messagePasteNrbMessage = alertObj.appendChild(d.createElement("div"));
    messagePasteNrbMessage.id = 'messagePasteNrbMessage';
    var msg = messagePasteNrbMessage.appendChild(d.createElement("p"));
    msg.innerHTML = '<strong>' + message + '</strong>';
    var messagePasteNrbButton = alertObj.appendChild(d.createElement("div"));
    messagePasteNrbButton.id = 'messagePasteNrbButton';
    btn = messagePasteNrbButton.appendChild(d.createElement("img"));
    btn.id = "closeBtn";
    btn.src = 'img/button/pl/button.ok.gif';
    btn.style.height = '25px';
    btn.style.margin = '10px';
    btn.style.cursor = 'pointer';
    btn.onclick = function() { 
    	removeCustomAlert();
    	return false; 
    };
    alertObj.style.display = "block";
}

function removeCustomAlert() {
    document.getElementsByTagName("body")[0].removeChild(document.getElementById("messagePasteNrb"));
    d.getElementById("page-cover").style.display = "none";
}