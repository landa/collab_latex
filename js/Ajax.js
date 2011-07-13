	function ajax_md5() {
		spinOn();
		new Ajax.Request('pass.php', 
			{
			method: 'get',
			parameters: { pw: $('md5_input_field').value },
			onSuccess: function(transport){
      			var response = transport.responseText;
				$('ali').innerHTML = response;
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_execPakFromTitle(s)
	{
		new Ajax.Request
		(
			'getcpak.php',
			{
				method: 'get',
				parameters: { cpak_title: s },
				onSuccess: function(transport)
				{
					pak = eval('new Array(' + transport.responseText + ')');
					addClassesFromPak(pak);
				}
			}
		);
	}
	
	function ajax_sendSticky(t, what, who, idx) {
		spinOn();
		who = $('es_who' + who).value;
		new Ajax.Request('stickysend.php', 
			{
			method: 'post',
			parameters: {to: who, title: t, body: $(what).value, id: idx },
			onSuccess: function(transport){
      			var response = transport.responseText;
      			// _notice(response, null); // Deprecated!
      			_post("Sticky Sent", "Your sticky content has been emailed to " + who + ".", 5, null);
      			spinOff();
    		},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_getTimes(course_number)
	{
		new Ajax.Request('thetimes.php',
		{
			method: 'post',
			parameters: { type: 'l', what: course_number },
			onSuccess: function(transport)
			{
				$("lec_list").innerHTML = transport.responseText;
			}
		});
		new Ajax.Request('thetimes.php',
		{
			method: 'post',
			parameters: { type: 'r', what: course_number },
			onSuccess: function(transport)
			{
				$("rec_list").innerHTML = transport.responseText;
			}
		});
		new Ajax.Request('thetimes.php',
		{
			method: 'post',
			parameters: { type: 'la', what: course_number },
			onSuccess: function(transport)
			{
				$("lab_list").innerHTML = transport.responseText;
			}
		});
	}
	
	function ajax_updateTodo(rwhich, rwhat, div)
	{
		new Ajax.Request('todo.php',
		{
			method: 'post',
			parameters:
			{
				which: rwhich,
				what: rwhat
			},
			onSuccess: function(transport)
			{
				var response = transport.responseText;
				updateTodo();
			}
		});
	}
	
	function ajax_deleteAll(a)
	{
		json = Object.toJSON(a);
		//alert(json.toString());
		spinOn();
		new Ajax.Request('deleteAll.php', 
			{
			method: 'post',
			parameters: { which: json },
			onSuccess: function(transport){
      			var response = transport.responseText;
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_getTooling(tds_index, drag)
	{
		new Ajax.Request
		(
			"gettooling.php",
			{
				method: "post",
				parameters:
				{
					todo_schema_idx: tds_index
				},
				onSuccess:
				function(transport)
				{
					var idx = transport.responseText;
					activePsets.set(idx, drag);
					drag.firstChild.innerHTML = idx;
					// loadAC(idx); // This loads the log (AC)
					loadPC(idx);
				}
			}
		);
	}
	
	function ajax_stopTooling(tds_index)
	{
		new Ajax.Request
		(
			"stoptooling.php",
			{
				method: "post",
				parameters:
				{
					todo_schema_idx: tds_index
				},
				onSuccess:
				function()
				{
					return transport.responseText;
				}
			}
		);
	}
	
	function ajax_saveTimer(index, ts)
	{
		if (index == 0)
			return;
		new Ajax.Request
		(
			"savetimer.php",
			{
				method: "post",
				parameters:
				{
					idx: index,
					timespent: ts
				},
				onSuccess:
				function()
				{
					
				}
			}
		);
	}
	
	function ajax_loadStickies()
	{
		spinOn();
		new Ajax.Request('stickyindex.php', 
			{
			method: 'get',
			parameters: { },
			onSuccess: function(transport){
      			var response = transport.responseText;
				if (response != '-1')
				{
					var sticky_title;
					var sticky_body;
					var sticky_idx;
					new Ajax.Request('stickyload.php',
						{
							method: 'get',
							parameters: { },
							onSuccess: function(t){
								notes = t.responseText.evalJSON();
								for (var idx in notes)
								{
									var note = notes[idx];
									spawnSticky(note.sticky_title, note.sticky_body, note.sticky_idx, note.sticky_top, note.sticky_left);
								}
							},
							onFailure: function(){ }
						});
				}
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_saveClasses(sem)
	{
		classes = $$('#' + sem + ' .a_class');
		cls = Array();
		for (x = 0; x < classes.length; x++)
		{
			cls.push(classes[x].childNodes[1].firstChild.nodeValue);
		}
		json = Object.toJSON(cls);
		new Ajax.Request('save.php', 
			{
			method: 'post',
			parameters: { classes: json, semester: sem },
			onSuccess: function(transport){
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_page() {
		spinOn();
		new Ajax.Request('page_check.php', 
			{
			method: 'get',
			parameters: { },
			onSuccess: function(transport){
      			var page_choice = transport.responseText;
				loadInitial();
				spinOff();
    			},
    		onFailure: function(){ spinOff(); SelectSchedule(); }
			}
		);
	}
	
	function ajax_userinfo(first, second)
	{
		{
			spinOn();
			new Ajax.Request('edit.php',
				{
				method: 'post',
				parameters: { fname: $('user_fname').value, lname: $('user_lname').value },
				onSuccess: function(){ FadeInput('user_fname'); FadeInput('user_lname'); spinOff(); },
				onFailure: function(){ spinOff(); }
				}
			);
		}
	}
	
	function ajax_lecnum(sel, sch)
	{
		{
			new Ajax.Request('lecnum.php',
				{
					method: 'get',
					parameters: { lecnum: sel, schedule_idx: sch },
					onSuccess: function(){ /* _save('ok'); */ /*new Effect.BounceLeft('schedule', { duration: 0.5, queue: 'end', fps: 100 });*/ },
					onFailure: function(){ /* _save('error') */ }
					
					
				}
			);
		}
	}
	
	function ajax_recnum(sel, sch)
	{
		{
			new Ajax.Request('recnum.php',
				{
					method: 'get',
					parameters: { recnum: sel, schedule_idx: sch },
					onSuccess: function(){ /*new Effect.BounceLeft('schedule', { duration: 0.5, queue: 'end', fps: 100 });*/ },
					onFailure: function(){ }
					
					
				}
			);
		}
	}
	
	function ajax_labnum(sel, sch)
	{
		{
			new Ajax.Request('labnum.php',
				{
					method: 'get',
					parameters: { labnum: sel, schedule_idx: sch },
					onSuccess: function(){ /*new Effect.BounceLeft('schedule', { duration: 0.5, queue: 'end', fps: 100 });*/ },
					onFailure: function(){ }
					
					
				}
			);
		}
	}
	
	function ajax_lookupClass(course)
	{
		if (!course.include('.'))
			return;
		new Ajax.Request('lookup.php', 
			{
			method: 'post',
			parameters: { id: course },
			onSuccess: function(transport){
				showClear();
				if ($("classsuggestions").style.display != "none")
					$("classsuggestions").style.display = "none";
      			var response = transport.responseText;
      			var json = response.evalJSON();
      			if (json.full_name == undefined || (classUnitsAdded.indexOf(json.course_number) > -1))
      				return;
      			var c = formatClass(json);
      			$('addClasses').appendChild(c);
      			if (Prototype.Browser.Firefox)
      				c.style.display = "inline";
      			new Effect.Appear(c, { duration: 0.1, queue: { scope: 'classLookup', position: 'end' } });
      			new Draggable(c.id, { revert: true, zindex: 10000, handle: "handle_" + c.id, onStart: function()
      															{
      																$(c.id).className = 'classUnit addClassUnit';
      															}, onEnd: function()
      															{
      																$(c.id).className = 'classUnit';
      															}});
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_addRecurringTodo(course, day, hour, min, tz, revert)
	{
		new Ajax.Request("todosch.php",
		{
			method: "post",
			parameters:
			{
				course_number: course,
				daydate: day,
				hourtime: hour,
				mintime: min,
				ampm: tz
			},
			onSuccess: function(transport)
			{
				fadeBlind("todosche");
				var newest = formatTodoRecurring(transport.responseText, "newtodo", true);
				if ($("newtodo_inactive"))
					Element.remove("newtodo_inactive");
				$("todo_schema_actual").insert(newest);
				new Effect.Appear(newest);
			}
		});
	}
	
	function ajax_listclasses() {
		spinOn();
		new Ajax.Request('listclasses.php', 
			{
			method: 'get',
			parameters: { },
			onSuccess: function(transport){
      			$('classes').innerHTML = transport.responseText;
      			new Effect.Appear('classes');
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	function ajax_addclass()
	{
		//if (FadeBlur('user_fname', first) && FadeBlur('user_lname', second))
		{
			spinOn();
			new Ajax.Request('new_class.php',
				{
				method: 'post',
				parameters: { sch_num: $('sch_num').value, sch_tit: $('sch_tit').value, sch_short: $('sch_short').value, sch_prof: $('sch_prof').value, sch_sem: $('sch_sem').value, sch_year: $('sch_year').value  },
				onSuccess: function(transport){
										FadeClear('sch_num', '19.001');
										FadeClear('sch_tit', 'Course title');
										FadeClear('sch_short', 'Short name');
										FadeClear('sch_prof', 'Professor');
										var sem = $('sch_sem').value;
										var semnum = "-1";
										if (sem == "IAP")
											semnum = "0";
										else if (sem == "Spring")
											semnum = "1";
										else if (sem == "Summer")
											semnum = "2";
										else if (sem == "Fall")
											semnum = "3";
										new Effect.BlindUp('classes', { queue: 'end', afterFinish: function() { $('classes').innerHTML = transport.responseText; new Effect.BlindDown('classes', { queue: 'end', afterFinish: function() { 
											new Effect.BlindDown('schedule_' + semnum + '_' + $('sch_year').value); } }); spinOff(); }});
									 },
				onFailure: function(){ spinOff(); }
				}
			);
		}
	}
	
	function ajax_message() {
		spinOn();
		new Ajax.Request('m_send.php', 
			{
			method: 'post',
			parameters: Form.serialize('m_compose'),
			onSuccess: function(transport){
      			var response = transport.responseText;
				$('errorz').innerHTML = response;
				spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}
	
	var twice = 0;
	
	function ajax_emailcheck()
	{
		var random = new Date().getTime();
		new Ajax.Request('emailcheck.php',
			 {
				 method: 'get',
				 parameters: { email: $('email_address').value, nocache: random },
				 onSuccess: function(transport)
				 {
					 var response = transport.responseText;
					 $('emailcheck').innerHTML = response;
					 if (response == "Welcome back.")
					 {
					 	//new Effect.Morph('signup_title', { style: 'background: #e3edcf', duration: 0.2 });
					 	//new Effect.Morph('login_title', { style: 'background: #ffffa0', duraction: 0.2 });
					 	$('signup_title').style.background = '#e3edcf';
					 	$('login_title').style.background = '#ffffa0';
					 	$('signup_title').style.borderBottom = '0';
					 	$('login_title').style.borderBottom = '1px solid darkred';
					 	new Effect.Fade('passagain', { duration: 0.5 });
					 	//new Effect.Appear('forgotlink', { duration: 0.5 });
					 	twice = 0;
					 }
					 else
					 {
					 	//new Effect.Morph('signup_title', { style: 'background: #ffffa0', duration: 0.2 });
					 	//new Effect.Morph('login_title', { style: 'background: #e3edcf', duration: 0.2 });
					 	$('signup_title').style.background = '#ffffa0';
					 	$('login_title').style.background = '#e3edcf';
					 	$('login_title').style.borderBottom = '0';
					 	$('signup_title').style.borderBottom = '1px solid darkred';
					 	twice = 1;
					 	//new Effect.Fade('forgotlink', { duration: 0.5 });
					 	if ($('password').value != '')
					 	{
					 		//new Effect.Appear('passagain', { duration: 1.0 });
					 		//$('passagain').value = '';
					 		//FadeClear('passagain', 'Password once again.');
					 	}
					 }
    			},
    		onFailure: function(){ }
			}
		);
	}
	
	/** 
	/* ajax_addCustomLecture
	/* -> 	s_index: 	schedule index
	/* 		csnum: 		course number
	/* 		cdx: 		course index
	 **/
	function ajax_addCustomLecture(lectime, s_index, csnum, cdx)
	{
		s_index = $("s_index").innerHTML;
		csnum = $("csnum").innerHTML;
		cdx = $("cdx").innerHTML;
		new Ajax.Request("lecnum_c.php",
		{
			method: "post",
			parameters:
			{
				lecs: lectime,
				six: s_index,
				num: csnum,
				cix: cdx
			},
			onSuccess: function(transport)
			{
				var resp = transport.responseText;
				var opt = new Element("option", { id: resp, selected: "true" });
				opt.innerHTML = resp;
				$("lec_choices").insertAfter(opt, $("lec_choices").childNodes[0]);
			}
		});
	}
	
	function ajax_addCustomRecitation(rectime)
	{
		s_index = $("s_index").innerHTML;
		csnum = $("csnum").innerHTML;
		cdx = $("cdx").innerHTML;
		new Ajax.Request("recnum_c.php",
		{
			method: "post",
			parameters:
			{
				recs: rectime,
				six: s_index,
				num: csnum,
				cix: cdx
			},
			onSuccess: function(transport)
			{
				var resp = transport.responseText;
				var opt = new Element("option", { id: resp, selected: "true" });
				opt.innerHTML = resp;
				$("lec_choices").insertAfter(opt, $("lec_choices").childNodes[0]);
			}
		});
	}
	
	// gets info from lectime object
	function extractInfo()
	{
		var ret = new Hash();
		//ret.set("days"
	}
	
	function ajax_info()
	{
		passwordStrength();
		if (pass == 0)
		{
			login_bad();
			return;
		}
		if (passwords_match == 0)
		{
			login_repeat();
			return;
		}
		$('emailcheck').innerHTML = 'Please wait...';
		new Ajax.Request('register.php',
			 {
				 method: 'post',
				 parameters: { email_address: $F('email_address'), password: $F('password') },
				 onSuccess: function(transport)
				 {
					 var response = transport.responseText;
					 $('emailcheck').innerHTML = response;
					 if (response == 'Wrong password.')
					 {
						 login_bad();
					 }
					 else if (response == 'Invalid email.')
					 {
						 login_invalid();
					 }
					 else if (response == 'Log in successful.' || response == 'Account created.')
					 {
						 login_good();
					 }
					 //spinOff();
    			},
    		onFailure: function(){ spinOff(); }
			}
		);
	}