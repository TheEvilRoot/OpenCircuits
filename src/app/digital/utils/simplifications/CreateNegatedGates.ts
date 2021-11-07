import {ReplaceComponent} from "core/utils/ComponentUtils";
import {DigitalCircuitDesigner} from "digital/models/DigitalCircuitDesigner";
import {ANDGate, ORGate, XORGate} from "digital/models/ioobjects";
import {NOTGate} from "digital/models/ioobjects/gates/BUFGate";
import {DigitalObjectSet, GetInvertedGate, RemoveGate} from "digital/utils/ComponentUtils";


/**
 * Replaces AND/OR/XOR gates followed by NOT gates with NAND/NOR/XNOR gates.
 * 
 * @param designer the designer that 
 * @param circuit the circuit to process
 * @returns a copy of the circuit with the negation simplifications made
 */
export function CreateNegatedGates(designer: DigitalCircuitDesigner, circuit: DigitalObjectSet) {
    circuit.getOthers().forEach(gate => {
        if (gate instanceof ANDGate || gate instanceof ORGate || gate instanceof XORGate) {
            const wires = gate.getOutputPort(0).getWires();
            if (wires.length === 1) {
                const other = wires[0].getOutputComponent();
                if (other instanceof NOTGate) {
                    RemoveGate(other);
                    ReplaceComponent(designer, gate, GetInvertedGate(gate));
                }
            }
        }
    });
}