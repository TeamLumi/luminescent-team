# Scripting Basics

Once you have ev-as setup per the readme in the [repository](https://github.com/z80rotom/ev-as) I also highly recommend [Visual Studio Code](https://code.visualstudio.com/) and the [language support for evscript extension](https://marketplace.visualstudio.com/items?itemName=Heroj04.bdsp-evscript-language-support).

You need to move your edited scripts to the `scripts` folder, not parsed. If you don't have a scripts folder, make one and move your edited scripts here. This is important because ev-as will only build scripts from the `scripts` folder. It does not look at `parsed`.

Also, when copying over your script changes to your emulator/switch for testing, you want to take the `ev_scripts` file from the `bin` folder, not `Dpr`, as `Dpr` will not have the changes. If you don't have a `bin` folder, make one.

Now you have the context on how to get your scripts interacting with the game, lets get to adding things.

## Baby steps
For our first attempt at scripting, we will change what an NPC says. Open VSC (Visual Studio Code)

In `c01.ev`, which is Jubilife external's scripts. Find `ev_c01_woman3` which should have a function body of 
```
_EASY_OBJ_MSG('dp_scenario1%27-msg_c01_woman3_01')
END()
```

The game looks for messages in this manner, find the `dp_scenario1` file, then find `27-msg_c01_woman3_01` inside it. `%` is just a separator. 

Back in the early days of scripting, we had to use tooling to create new messages in these files, but thankfully, with the addition of macros, you no longer need to do this.
Most dialogue commands have been extended to have what is known as a "Macro" variant, which you can pass text to, which will then be displayed as dialogue. In this instance,  it would be `_MACRO_EASY_OBJ_MSG`.

Now what do we do? That's easy, you simply change the current `_EASY_OBJ_MSG` line to the following.

`_MACRO_EASY_OBJ_MSG('dp_scenario1', '27-msg_c01_woman3_01', 'Spinda is the best Pokémon ever.')`

Now all you need to do is save and compile your new script. I personally use `python3 src/ev_as.py` with my setup.

Once that completes (you may need to provide the dp_scenario1 message file in another folder).  Simply take `bin\ev_script` and put it in your mod folder in `Dpr`.
